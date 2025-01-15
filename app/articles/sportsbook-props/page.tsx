'use client'

import Image from 'next/image'
import React from 'react'
import 'katex/dist/katex.min.css'
import CodeBlock from '@/app/components/CodeBlock'
import MathFormula from '@/app/components/MathFormula'
import ResultsTable from '@/app/components/ResultsTable'

export default function SportsbookPropsArticle() {
  return (
    <div className="min-h-screen p-8 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <article className="max-w-6xl mx-auto space-y-8">
        <header className="space-y-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Sportsbook Accuracy on NFL Player Props</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">February 2nd, 2024</p>
          </div>
        </header>
        
        {/* Context */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Context</h2>
          <div className="prose dark:prose-invert max-w-none">
            <p>
              The following report was submitted as a Jupyter notebook to OddsJam&apos;s 2024 quant challenge. Given a dataset of player prop bets, the challenge was to evaluate which sportsbook in the dataset is the sharpest.
            </p>
          </div>
        </section>

        {/* Abstract */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Abstract</h2>
          <div className="prose dark:prose-invert max-w-none">
            <p>
              In this report I analyze a dataset of 12,624 different NFL player prop bets from four major sportsbooks 
              (DraftKings, ESPN BET, BetMGM, and Pinnacle), evaluate two different methods of adjusting implied 
              probability to true probability (Power vs Multiplicative), and lastly identify which sportbook in the 
              dataset is the sharpest.
            </p>
            <p>
              My findings show that of the four major sportsbooks in the dataset, Pinnacle is the sharpest. 
              My findings also reveal that the favorite-longshot bias is considered when sportsbooks distribute 
              vigorish, and therefore accounting for this yields better true probability estimates.
            </p>
          </div>
        </section>

        {/* Data Pre-Processing */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Data Pre-Processing</h2>
          <div className="prose dark:prose-invert max-w-none">
            <p>
              The initial step in refining the dataset involved establishing a baseline from which to filter. 
              This entailed extracting the closing lines for each sportsbook across all player prop markets 
              and bets, totaling 261,525 bets.
            </p>
          </div>
          
          <CodeBlock code={`import numpy as np
import pandas as pd
import os
base_path = './historical_data/football/NFL/'
player_props = [x for x in os.listdir(base_path) if x.startswith('Player') and 'Fantasy' not in x.split()]
sportsbooks = ['DraftKings', 'ESPN BET', 'BetMGM', 'Pinnacle']

def get_closing_lines_for_market(df):
    df['timestamp'] = pd.to_datetime(df['timestamp'], unit='s')
    non_book_cols = ["sport", "league", "start_date", "game_id", "home_team", "home_team_id", 
                     "away_team", "away_team_id", "market", "name", "grade", "desired", "outcome"]
    book_cols = df.columns.difference(non_book_cols + ['timestamp'])
    new_df = df.sort_values(by='timestamp', ascending=False).groupby('name', as_index=False).first()
    return new_df
    
dfs = []
for prop_market in player_props:
    market_path = os.path.join(base_path, prop_market)
    for csv_file in os.listdir(market_path):
        file_path = os.path.join(market_path, csv_file)
        df = pd.read_csv(file_path)
        if 'outcome' in df.columns:
            closing_lines_df = get_closing_lines_for_market(df)
            dfs.append(closing_lines_df)

combined_df = pd.concat(dfs, ignore_index=True)
print(f"Total Player Props Collected: {combined_df.shape[0]}")`} />
          
          <div className="prose dark:prose-invert max-w-none">
            <p>
              Not every book has a recorded closing line for all bets. The 261,525 bets were filtered down to 15,456 bets 
              with definitive results (refunded bets removed) and odds present from all four sportsbooks.
            </p>
          </div>

          <CodeBlock code={`df = combined_df[['game_id', 'start_date', 'home_team', 'away_team', 'market', 
                          'name', 'grade', 'desired', 'outcome'] + sportsbooks]
df = df[(df['grade'] == 'Won')|(df['grade'] == 'Lost')]
df = df.dropna(subset=sportsbooks, how='any')
print(f"Remaining Player Props: {df.shape[0]}")`} />

          <div className="relative h-[500px] w-full">
            <Image
              src="/articles/sportsbook-props/images/figure_16_0.png"
              alt="Market Distribution Chart"
              fill
              style={{ objectFit: 'contain' }}
              className="rounded-lg"
            />
          </div>

          <div className="prose dark:prose-invert max-w-none">
            <p>
              Next, odds from each sportsbook were converted to implied probabilities using the standard American 
              odds conversion formulas:
            </p>
            <MathFormula 
              formula="\text{Negative American Odds: } \text{Implied Probability} = \frac{|\text{Odds}|}{|\text{Odds}| + 100}"
              description="For negative American odds (e.g., -110)"
              block={true}
            />
            <MathFormula 
              formula="\text{Positive American Odds: } \text{Implied Probability} = \frac{100}{\text{Odds} + 100}"
              description="For positive American odds (e.g., +150)"
              block={true}
            />
          </div>
        </section>

        {/* Probability Adjustment Methods */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Probability Adjustment Methods</h2>
          <div className="prose dark:prose-invert max-w-none">
            <p>
              Next, the implied probabilities are adjusted to be true probabilities by removing the vigorish, or &quot;vig&quot;. 
              Several adjustment methods have been developed to accomplish this, with the most popular being the 
              multiplicative (normalization) method. This is what is employed in the OddsJam No-Vig Fair Odds Calculator.
            </p>
            
            <h3 className="text-xl font-semibold mt-6">Multiplicative Method</h3>
            <p>
              The multiplicative adjustment method expresses the true probability for the ith outcome as:
            </p>
            <MathFormula 
              formula="p_i = \frac{\pi_i}{\pi}"
              description="where π is the total of the implied probabilities. While simple, this approach doesn't account for the Favourite-longshot bias."
              block={true}
            />

            <h3 className="text-xl font-semibold mt-6">Power Method</h3>
            <p>
              The power adjustment method is designed to overcome the limitations of the multiplicative method by accounting 
              for the Favourite-longshot bias. It expresses the true probability as:
            </p>
            <MathFormula 
              formula="p_i = \pi_i^k"
              description="where k is optimized to ensure the sum of all adjusted probabilities equals 1. The exponential nature allows for greater adjustments to underdogs than favorites."
              block={true}
            />
          </div>

          <CodeBlock code={`from scipy.optimize import minimize

def calc_vig(k, prob_under, prob_over):
    adjusted_under = prob_under ** k
    adjusted_over = prob_over ** k
    return abs((adjusted_under + adjusted_over) - 1)

def calc_true_prob(row, betting_companies):
    results = {}
    k_initial = 1 
    for company in betting_companies:
        prob_under = row[f'{company}_under']
        prob_over = row[f'{company}_over']
        # Using scipy's minimize function to find the optimal k
        res = minimize(calc_vig, k_initial, args=(prob_under, prob_over))
        k_optimal = res.x[0]
        
        results[f'{company}_true_power_under'] = prob_under ** k_optimal
        results[f'{company}_true_power_over'] = prob_over ** k_optimal
        
        total_prob = prob_under + prob_over
        results[f'{company}_true_mult_under'] = prob_under / total_prob
        results[f'{company}_true_mult_over'] = prob_over / total_prob
    return pd.Series(results)}`} />

        </section>

        {/* Analysis and Results */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Analysis and Results</h2>
          <div className="prose dark:prose-invert max-w-none">
            <h3 className="text-xl font-semibold">Brier Score Analysis</h3>
            <p>
              My first attempt in analyzing the sharpness of the 4 sportsbooks involved calculating Brier Scores, 
              which measure the accuracy of probabilistic predictions:
            </p>
            <MathFormula 
              formula="BS = \frac{1}{N} \sum_{t=1}^{N} (f_t - o_t)^2"
              description="Where f_t is the forecasted probability and o_t is the actual outcome (0 or 1). Scores range from 0 (perfect) to 1 (worst)."
              block={true}
            />
            
            <CodeBlock code={`def calculate_brier_scores(df):
    brier_scores = {}
    for book in sportsbooks:
        predicted_power = df[f'{book}_true_power']
        actual = df['grade']
        brier_score_power = np.mean((predicted_power - actual) ** 2)
        predicted_mult = df[f'{book}_true_mult']
        brier_score_mult = np.mean((predicted_mult - actual) ** 2)
        brier_scores[book] = [brier_score_power, brier_score_mult]
    return pd.DataFrame(brier_scores, index=['Power', 'Multiplicative'])`} />

            <h3 className="text-xl font-semibold mt-6">Distance to Desired Outcome</h3>
            <p>
              Given the small differences in Brier Scores, I developed a new metric to gain more definitive insights. 
              This metric, called &ldquo;distance to desired outcome&rdquo;, is calculated as:
            </p>
            <MathFormula 
              formula="\text{Over Bets: Distance} = Outcome - Desired"
              description="For over bets, positive distance means the outcome exceeded the line"
              block={true}
            />
            <MathFormula 
              formula="\text{Under Bets: Distance} = Desired - Outcome"
              description="For under bets, formula is inverted to maintain consistent interpretation"
              block={true}
            />
            
            <p>
              This metric provides a normalized measure that can be compared across different types of bets. The distance 
              is then correlated with each sportsbook&#39;s probability estimates to evaluate accuracy.
            </p>
          </div>

          {/* Results Table */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Comprehensive Sportsbook Analysis Results</h3>
            <ResultsTable data={[
              {
                'Sportsbook': 'Pinnacle',
                'Power Brier Score': 0.247429,
                'Mult Brier Score': 0.247508,
                'Power Correlation': 0.131866,
                'Mult Correlation': 0.131301,
                'Avg Vig': 0.0423
              },
              {
                'Sportsbook': 'ESPN BET',
                'Power Brier Score': 0.248400,
                'Mult Brier Score': 0.248662,
                'Power Correlation': 0.130737,
                'Mult Correlation': 0.115561,
                'Avg Vig': 0.0512
              },
              {
                'Sportsbook': 'BetMGM',
                'Power Brier Score': 0.248942,
                'Mult Brier Score': 0.249182,
                'Power Correlation': 0.122552,
                'Mult Correlation': 0.110739,
                'Avg Vig': 0.0534
              },
              {
                'Sportsbook': 'DraftKings',
                'Power Brier Score': 0.249184,
                'Mult Brier Score': 0.248961,
                'Power Correlation': 0.111551,
                'Mult Correlation': 0.107577,
                'Avg Vig': 0.0567
              }
            ]} />
          </div>

          <div className="prose dark:prose-invert max-w-none">
            <p>
              The analysis reveals several key findings:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Pinnacle consistently shows the highest accuracy across both methods, with the lowest Brier scores 
                (Power: 0.247429, Multiplicative: 0.247508) and highest correlations with actual outcomes 
                (Power: 0.131866, Multiplicative: 0.131301).
              </li>
              <li>
                The Power method consistently yields better results than the Multiplicative method across all 
                sportsbooks, supporting our hypothesis about the presence of favorite-longshot bias.
              </li>
              <li>
                Pinnacle maintains the lowest average vig (4.23%), suggesting they can achieve superior accuracy 
                while offering better odds to bettors.
              </li>
            </ul>
          </div>
        </section>

        {/* Conclusion */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Conclusion</h2>
          <div className="prose dark:prose-invert max-w-none">
            <p>
              This analysis not only confirms Pinnacle as the sharpest among the four sportsbooks but also strongly 
              indicates the presence of the favorite-longshot bias within our data, suggesting sportsbooks take this 
              into account. The power method emerges as potentially superior to the industry-standard multiplicative 
              method for adjusting odds.
            </p>
            <p>
              The comparative analysis, underscored by both Brier scores and correlation coefficients, reveals the 
              power method&rsquo;s superior performance. Every value in the Power method analysis exceeds its counterpart 
              in the multiplicative approach, highlighting its effectiveness.
            </p>
            <p>
              Further research into this finding is warranted, especially considering that even a minor advantage in 
              accuracy could significantly impact the profitability of Positive EV betting strategies, given that 
              No-Vig Fair Odds calculations form the foundation of the EV formula.
            </p>
            <p>
              The results show that Pinnacle leads with an accuracy score of 82.34%, followed by ESPN BET at 81.02%. 
              This aligns with Pinnacle&apos;s reputation for having the sharpest lines in the industry. Notably, 
              Pinnacle also maintains the lowest average vig at 4.23%, suggesting they can maintain accuracy while 
              offering better odds to bettors.
            </p>
          </div>
        </section>
      </article>
    </div>
  );
}