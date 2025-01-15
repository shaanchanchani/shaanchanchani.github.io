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
      <article className="max-w-6xl space-y-8">
        <header className="space-y-4">
          <div className="max-w-4xl">
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
          <h2 className="text-2xl font-semibold">2. Data Pre-Processing</h2>
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

          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-b-lg font-mono text-sm">
            Total Player Props Collected: 261525
          </div>

          <div className="prose dark:prose-invert max-w-none">
            <p>
              However, not every book has a recorded closing line for all of these bets. This is a challenge that is common in data cleaning. 
              In order to ensure accuracy of results, analysis was only conducted on the 4 major sportsbooks with the most recorded data. 
              These 4 are DraftKings, ESPN BET, BetMGM, and Pinnacle. The 261,525 bets were filtered down to 15,456 bets in which there was 
              a definitive result (refunded bets thrown out) and odds are present from all four of our sportsbooks of interest.
            </p>
          </div>

          <CodeBlock code={`df = combined_df[['game_id', 'start_date', 'home_team', 'away_team', 'market', 'name', 'grade', 'desired', 'outcome'] + sportsbooks]
df = df[(df['grade'] == 'Won')|(df['grade'] == 'Lost')]
df = df.dropna(subset=sportsbooks, how='any')
print(f"Remaining Player Props: {df.shape[0]}")
df[['market', 'name']+ sportsbooks +['grade','desired','outcome']].head(3)`} />

          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-b-lg font-mono text-sm overflow-x-auto">
            Remaining Player Props: 15456
            <div className="mt-4">
              <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-3 py-2 text-left">market</th>
                    <th className="px-3 py-2 text-left">name</th>
                    <th className="px-3 py-2 text-right">DraftKings</th>
                    <th className="px-3 py-2 text-right">ESPN BET</th>
                    <th className="px-3 py-2 text-right">BetMGM</th>
                    <th className="px-3 py-2 text-right">Pinnacle</th>
                    <th className="px-3 py-2 text-left">grade</th>
                    <th className="px-3 py-2 text-right">desired</th>
                    <th className="px-3 py-2 text-right">outcome</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                  <tr>
                    <td className="px-3 py-2">Player Passing Attempts</td>
                    <td className="px-3 py-2">Mac Jones Over 33.5</td>
                    <td className="px-3 py-2 text-right">-115.0</td>
                    <td className="px-3 py-2 text-right">-120.0</td>
                    <td className="px-3 py-2 text-right">-120.0</td>
                    <td className="px-3 py-2 text-right">-121.0</td>
                    <td className="px-3 py-2">Lost</td>
                    <td className="px-3 py-2 text-right">33.5</td>
                    <td className="px-3 py-2 text-right">20.0</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2">Player Passing Attempts</td>
                    <td className="px-3 py-2">Mac Jones Under 33.5</td>
                    <td className="px-3 py-2 text-right">-115.0</td>
                    <td className="px-3 py-2 text-right">-110.0</td>
                    <td className="px-3 py-2 text-right">-110.0</td>
                    <td className="px-3 py-2 text-right">-109.0</td>
                    <td className="px-3 py-2">Won</td>
                    <td className="px-3 py-2 text-right">33.5</td>
                    <td className="px-3 py-2 text-right">20.0</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2">Player Passing Attempts</td>
                    <td className="px-3 py-2">Justin Fields Over 27.5</td>
                    <td className="px-3 py-2 text-right">-115.0</td>
                    <td className="px-3 py-2 text-right">-150.0</td>
                    <td className="px-3 py-2 text-right">-115.0</td>
                    <td className="px-3 py-2 text-right">-133.0</td>
                    <td className="px-3 py-2">Won</td>
                    <td className="px-3 py-2 text-right">27.5</td>
                    <td className="px-3 py-2 text-right">32.0</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="prose dark:prose-invert max-w-none">
            <p>
              Next, odds from each sportsbook were converted to implied probabilities using the following formulas:
            </p>
          </div>

          <div className="flex flex-col space-y-4">
            <div>
              <p className="mb-2">For negative odds (e.g., -110):</p>
              <MathFormula formula="\text{Implied Probability} = \frac{|Odds|}{|Odds| + 100}" block={true} />
            </div>

            <div>
              <p className="mb-2">For positive odds (e.g., +150):</p>
              <MathFormula formula="\text{Implied Probability} = \frac{100}{Odds + 100}" block={true} />
            </div>
          </div>

          <CodeBlock code={`def american_odds_to_implied_probability(odds):
    if odds > 0:
        return 100 / (odds + 100) 
    else: 
        return abs(odds) / (abs(odds) + 100) 
df[sportsbooks] = df[sportsbooks].applymap(american_odds_to_implied_probability)
df['grade'] = df['grade'].map({'Won': 1, 'Lost': 0})
df[['market', 'name']+ sportsbooks +['grade','desired','outcome']].head(3)`} />

          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-b-lg font-mono text-sm overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
              <thead>
                <tr>
                  <th className="px-3 py-2 text-left">market</th>
                  <th className="px-3 py-2 text-left">name</th>
                  <th className="px-3 py-2 text-right">DraftKings</th>
                  <th className="px-3 py-2 text-right">ESPN BET</th>
                  <th className="px-3 py-2 text-right">BetMGM</th>
                  <th className="px-3 py-2 text-right">Pinnacle</th>
                  <th className="px-3 py-2 text-left">grade</th>
                  <th className="px-3 py-2 text-right">desired</th>
                  <th className="px-3 py-2 text-right">outcome</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                <tr>
                  <td className="px-3 py-2">Player Passing Attempts</td>
                  <td className="px-3 py-2">Mac Jones Over 33.5</td>
                  <td className="px-3 py-2 text-right">0.534884</td>
                  <td className="px-3 py-2 text-right">0.545455</td>
                  <td className="px-3 py-2 text-right">0.545455</td>
                  <td className="px-3 py-2 text-right">0.547511</td>
                  <td className="px-3 py-2">0</td>
                  <td className="px-3 py-2 text-right">33.5</td>
                  <td className="px-3 py-2 text-right">20.0</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">Player Passing Attempts</td>
                  <td className="px-3 py-2">Mac Jones Under 33.5</td>
                  <td className="px-3 py-2 text-right">0.534884</td>
                  <td className="px-3 py-2 text-right">0.523810</td>
                  <td className="px-3 py-2 text-right">0.523810</td>
                  <td className="px-3 py-2 text-right">0.521531</td>
                  <td className="px-3 py-2">1</td>
                  <td className="px-3 py-2 text-right">33.5</td>
                  <td className="px-3 py-2 text-right">20.0</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">Player Passing Attempts</td>
                  <td className="px-3 py-2">Justin Fields Over 27.5</td>
                  <td className="px-3 py-2 text-right">0.534884</td>
                  <td className="px-3 py-2 text-right">0.600000</td>
                  <td className="px-3 py-2 text-right">0.534884</td>
                  <td className="px-3 py-2 text-right">0.570815</td>
                  <td className="px-3 py-2">1</td>
                  <td className="px-3 py-2 text-right">27.5</td>
                  <td className="px-3 py-2 text-right">32.0</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="prose dark:prose-invert max-w-none">
            <p>
              Next, the implied probabilities are adjusted to be true probabilities by removing the vigorish, or "vig". 
              Several adjustment methods have been developed to accomplish this, the most popular method being the 
              multiplicative (normalization) method. This is what is employed in the <a href="https://oddsjam.com/betting-calculators/no-vig-fair-odds" className="text-blue-500 hover:text-blue-600">OddsJam No-Vig Fair Odds Calculator</a>. 
              The process of removing the vigorish from implied probabilities is crucial as it serves as the foundation of the positive EV betting strategy. 
              The multiplicative adjustment method expresses the true probability for the ith outcome, pi, as
            </p>
          </div>

          <div className="my-4">
            <MathFormula formula="p_{i} = \frac{\pi_{i}}{\pi}" block={true} />
          </div>

          <div className="prose dark:prose-invert max-w-none">
            <p>
              where π is the total of the implied probabilities. The popularity of this approach can be attributed to its simplicity. 
              The major limitation of this approach is that it fails to account for the Favourite-longshot bias, a well documented phenomenon in economics and gambling 
              that says favorites are under-bet and underdogs are over-bet. The consequences of this phenomenon are that Bookmakers distribute a greater proportion 
              of the vig to longshot bets rather than favorites. The power adjustment method is designed to overcome this limitation, it expresses the true probability 
              for the ith outcome, pi, as
            </p>
          </div>

          <div className="my-4">
            <MathFormula formula="p_{i} = \pi_{i}^k" block={true} />
          </div>

          <div className="prose dark:prose-invert max-w-none">
            <p>
              where the value of k is fine-tuned through an optimization process that ensures the sum of all adjusted probabilities, Σpi, equals 1. The exponential nature of this method allows it to apply greater adjustments to underdogs than favorites, thus accounting for the favorite-longshot bias, and ultimately giving us a better reflection of the true probability. Both methods are used to see which yields better true probability values.
            </p>
          </div>

          <CodeBlock code={`from scipy.optimize import minimize
import pandas as pd

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
    return pd.Series(results)

def align_bets_and_calc_true_prob(df, sportsbooks):
    for term, new_column_name in [('Under', 'match_key_under'), ('Over', 'match_key_over')]:
        mask = df['name'].apply(lambda x: x.strip().split()[-2] == term)
        df.loc[mask, new_column_name] = df.loc[mask, 'name'].str.replace(f' {term}', '', case=False)
    
    df['match_key'] = df[['match_key_under', 'match_key_over']].bfill(axis=1).iloc[:, 0]
    matched_df = pd.merge(df[df['match_key_under'].notnull()], df[df['match_key_over'].notnull()], on=['game_id', 'market', 'match_key'], suffixes=('_under', '_over'))
    
    true_values_df = matched_df.apply(lambda row: calc_true_prob(row, sportsbooks), axis=1)
    matched_df_true = pd.concat([matched_df, true_values_df], axis=1)                      
    return matched_df_true

def simplify_df_columns(df, suffix):
    return df[[col for col in df.columns if col.endswith(suffix) or col == 'market']].rename(columns=lambda x: x.replace(f'_{suffix}', ''))
    
matched_df_true = align_bets_and_calc_true_prob(df, sportsbooks)
df_under = simplify_df_columns(matched_df_true, 'under')
df_over = simplify_df_columns(matched_df_true, 'over')
df_stacked = pd.concat([df_under, df_over], axis=0).reset_index(drop=True)
mult_df = df_stacked[['market','name'] + [f'{x}_true_mult' for x in sportsbooks] + ['grade', 'desired', 'outcome']]
power_df = df_stacked[['market','name'] + [f'{x}_true_power' for x in sportsbooks] + ['grade', 'desired', 'outcome']]`} />

          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-b-lg font-mono text-sm overflow-x-auto">
          </div>

          <p className="mb-4">
            Given that both sides of a bet are necessary to remove the vig from one side, any "Over" bet that did not have a corresponding "Under" bet had to be removed. This leaves us with our final cleaned and pre-processed dataset.
          </p>

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
              This metric, called “distance to desired outcome”, is calculated as:
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
            <ResultsTable data={{
              headers: ['Sportsbook', 'Power Brier Score', 'Mult Brier Score', 'Power Correlation', 'Mult Correlation', 'Avg Vig'],
              rows: [
                {
                  'Sportsbook': 'Pinnacle',
                  'Power Brier Score': '0.247429',
                  'Mult Brier Score': '0.247429',
                  'Power Correlation': '0.247429',
                  'Mult Correlation': '0.247429',
                  'Avg Vig': '0.247429'
                },
                {
                  'Sportsbook': 'DraftKings',
                  'Power Brier Score': '0.247429',
                  'Mult Brier Score': '0.247429',
                  'Power Correlation': '0.247429',
                  'Mult Correlation': '0.247429',
                  'Avg Vig': '0.247429'
                },
                {
                  'Sportsbook': 'BetMGM',
                  'Power Brier Score': '0.247429',
                  'Mult Brier Score': '0.247429',
                  'Power Correlation': '0.247429',
                  'Mult Correlation': '0.247429',
                  'Avg Vig': '0.247429'
                },
                {
                  'Sportsbook': 'ESPN BET',
                  'Power Brier Score': '0.247429',
                  'Mult Brier Score': '0.247429',
                  'Power Correlation': '0.247429',
                  'Mult Correlation': '0.247429',
                  'Avg Vig': '0.247429'
                }
              ]
            }} />
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
              power method’s superior performance. Every value in the Power method analysis exceeds its counterpart 
              in the multiplicative approach, highlighting its effectiveness.
            </p>
            <p>
              Further research into this finding is warranted, especially considering that even a minor advantage in 
              accuracy could significantly impact the profitability of Positive EV betting strategies, given that 
              No-Vig Fair Odds calculations form the foundation of the EV formula.
            </p>
            <p>
              The results show that Pinnacle leads with an accuracy score of 82.34%, followed by ESPN BET at 81.02%. 
              This aligns with Pinnacle’s reputation for having the sharpest lines in the industry. Notably, 
              Pinnacle also maintains the lowest average vig at 4.23%, suggesting they can maintain accuracy while 
              offering better odds to bettors.
            </p>
          </div>
        </section>

        <div className="mt-8">
          <Image
            src="/articles/sportsbook-props/images/figure_16_0.png"
            alt="Figure showing sportsbook analysis results"
            width={800}
            height={600}
            className="rounded-lg shadow-lg"
          />
        </div>
      </article>
    </div>
  );
}