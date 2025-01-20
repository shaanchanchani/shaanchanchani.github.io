'use client'

import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import 'katex/dist/katex.min.css'
import CodeBlock from '@/app/components/CodeBlock'
import MathFormula from '@/app/components/MathFormula'
import { renderTable } from '@/app/components/SportsbookPropsArticle/TableRenderer'

export default function SportsbookPropsArticle() {
  return (
    <div className="min-h-screen px-4 sm:px-6 md:px-8 py-8 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <article className="max-w-3xl mx-auto space-y-6">
        {/* Back Navigation */}
        <Link 
          href="/" 
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors mb-4 underline"
        >
          <svg 
            className="w-5 h-5 mr-2" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Home
        </Link>

        <header className="space-y-2 mb-8">
          <h1 className="text-3xl font-['SF_Pro_Text']">
            <span className="font-bold">Measuring Sportsbook Accuracy:</span>{' '}
            <span className="font-normal">Analysis of NFL Player Props Using Line Deviations</span>
          </h1>
          <div className="text-base text-gray-500 dark:text-gray-400 font-['SF_Pro_Text']">
            Shaan Chanchani | February 2nd, 2024
          </div>
          <a 
            href="https://github.com/shaanchanchani/quant-challenge/blob/main/quantchallenge_shaan_chanchani.ipynb"
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline"
          >
            <Image 
              src="https://img.shields.io/badge/Jupyter-notebook-blue?logo=jupyter"
              alt="Jupyter Notebook"
              width={110}
              height={20}
              className="mt-2"
            />
          </a>
        </header>
        
        {/* Context */}
        <section className="space-y-3">
          <div className="prose dark:prose-invert max-w-none text-base font-['SF_Pro_Text']">
            <p>
              The following article is adapted from a Jupyter notebook I submitted to OddsJam&apos;s 2024 quant challenge. Given a dataset of player prop bets, the challenge was to evaluate which sportsbook in the dataset is the sharpest.
            </p>
          </div>
        </section>

        {/* Abstract */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold font-['SF_Pro_Text']">Abstract</h2>
          <div className="prose dark:prose-invert max-w-none text-base font-['SF_Pro_Text']">
            <p>
            This study analyzes the efficiency and accuracy of NFL player prop betting markets by examining 12,624 unique bets across four major sportsbooks: DraftKings, ESPN BET, BetMGM, and Pinnacle. The research evaluates two probability adjustment methodologies—Power and Multiplicative models—while also assessing relative market sharpness among the sportsbooks.
            </p>
            <p>
            The findings demonstrate that Pinnacle consistently exhibits the sharpest pricing in the dataset. Furthermore, the analysis reveals that sportsbooks incorporate favorite-longshot bias in their vigorish distribution, suggesting that accounting for this bias produces more accurate probability estimates.
            </p>
          </div>
        </section>

        {/* Data Pre-Processing */}
        <section className="space-y-5">
          <h2 className="text-xl font-bold font-['SF_Pro_Text']">Data Preprocessing</h2>
          <div className="prose dark:prose-invert max-w-none text-base font-['SF_Pro_Text']">
            <p>
            The data preparation process began with collecting closing lines from four major sportsbooks across all available player prop markets. This initial dataset comprised 261,525 individual bets, which served as the foundation for subsequent filtering and analysis.
            </p>
          </div>
          
          <CodeBlock 
            code={`import numpy as np
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
print(f"Total Player Props Collected: {combined_df.shape[0]}")`}
            output="Total Player Props Collected: 261525"
            title="Show hidden code"
          />

          <div className="prose dark:prose-invert max-w-none text-base font-['SF_Pro_Text']">
            <p>
            For any given player prop in the dataset, a closing line wasn't always present from all sportsbooks. To ensure analytical consistency, I limited my analysis to the four sportsbooks that most frequently provided odds: DraftKings, ESPN BET, BetMGM, and Pinnacle. After filtering for bets with closing lines from all four books and removing refunded bets, the dataset was reduced from 261,525 to 15,456 bets.            </p>
          </div>

          <CodeBlock 
            code={`df = combined_df[['game_id', 'start_date', 'home_team', 'away_team', 'market', 'name', 'grade', 'desired', 'outcome'] + sportsbooks]
df = df[(df['grade'] == 'Won')|(df['grade'] == 'Lost')]
df = df.dropna(subset=sportsbooks, how='any')
print(f"Remaining Player Props: {df.shape[0]}")
df[['market', 'name']+ sportsbooks +['grade','desired','outcome']].head(3)`}
            output={`Remaining Player Props: 15456

${renderTable(
  ['market', 'name', 'DraftKings', 'ESPN BET', 'BetMGM', 'Pinnacle', 'grade', 'desired', 'outcome'],
  [
    {
      market: 'Player Passing Attempts',
      name: 'Mac Jones Over 33.5',
      DraftKings: '-115.0',
      'ESPN BET': '-120.0',
      BetMGM: '-120.0',
      Pinnacle: '-121.0',
      grade: '0',
      desired: '33.5',
      outcome: '20.0'
    },
    {
      market: 'Player Passing Attempts',
      name: 'Mac Jones Under 33.5',
      DraftKings: '-115.0',
      'ESPN BET': '-110.0',
      BetMGM: '-110.0',
      Pinnacle: '-109.0',
      grade: '1',
      desired: '33.5',
      outcome: '20.0'
    },
    {
      market: 'Player Passing Attempts',
      name: 'Justin Fields Over 27.5',
      DraftKings: '-115.0',
      'ESPN BET': '-150.0',
      BetMGM: '-115.0',
      Pinnacle: '-133.0',
      grade: '1',
      desired: '27.5',
      outcome: '32.0'
    }
  ]
)}`}
            language="python"
            title="Show hidden code"
            defaultExpanded={false}
            showExpandButton={true}
          />

          <div className="prose dark:prose-invert max-w-none text-base font-['SF_Pro_Text']">
            <p>
            To prepare the data for analysis, betting odds were first converted to implied probabilities using standard formulas:
            </p>
          </div>

          <div className="flex flex-col space-y-3">
            <div>
              <div className="prose dark:prose-invert max-w-none text-base font-['SF_Pro_Text']">
                <p>
                For negative odds (e.g., -110):                </p>
              </div>
              <MathFormula formula="\text{Implied Probability} = \frac{|Odds|}{|Odds| + 100}" block={true} />
            </div>

            <div>
                  <div className="prose dark:prose-invert max-w-none text-base font-['SF_Pro_Text']">
                      <p>
                      For positive odds (e.g., +150):                </p>
                  </div>
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
df[['market', 'name']+ sportsbooks +['grade','desired','outcome']].head(3)`} 
            output={`Remaining Player Props: 15456

${renderTable(
  ['market', 'name', 'DraftKings', 'ESPN BET', 'BetMGM', 'Pinnacle', 'grade', 'desired', 'outcome'],
  [
    {
      market: 'Player Passing Attempts',
      name: 'Mac Jones Over 33.5',
      DraftKings: '0.534884',
      'ESPN BET': '0.545455',
      BetMGM: '0.545455',
      Pinnacle: '0.547511',
      grade: '0',
      desired: '33.5',
      outcome: '20.0'
    },
    {
      market: 'Player Passing Attempts',
      name: 'Mac Jones Under 33.5',
      DraftKings: '0.534884',
      'ESPN BET': '0.523810',
      BetMGM: '0.523810',
      Pinnacle: '0.521531',
      grade: '1',
      desired: '33.5',
      outcome: '20.0'
    },
    {
      market: 'Player Passing Attempts',
      name: 'Justin Fields Over 27.5',
      DraftKings: '0.534884',
      'ESPN BET': '0.600000',
      BetMGM: '0.534884',
      Pinnacle: '0.570815',
      grade: '1',
      desired: '27.5',
      outcome: '32.0'
    }
  ]
)}`}
            language="python"
            title="Show hidden code"
            defaultExpanded={false}
            showExpandButton={true}
          />

          <div className="prose dark:prose-invert max-w-none text-base font-['SF_Pro_Text']">
            <p>
              These implied probabilities were then adjusted to true probabilities by removing the vigorish ('vig'). Two distinct adjustment methods were evaluated: the multiplicative method and the power method.
            </p>
          </div>
          <h2 className="text-base font-medium font-['SF_Pro_Text']">Multiplicative Method</h2>
          <div className="prose dark:prose-invert max-w-none text-base font-['SF_Pro_Text']">
            <p>
              The multiplicative method, which is widely used and implemented in tools like the OddsJam No-Vig Fair Odds Calculator, calculates the true probabilities as:
            </p>
          </div>

          <div className="my-3">
            <MathFormula formula="P_{t}(over) = \frac{P_{i}(over)}{P_{i}(over) + P_{i}(under)}" block={true} />
            <MathFormula formula="P_{t}(under) = \frac{P_{i}(under)}{P_{i}(over) + P_{i}(under)}" block={true} />
          </div>

          <div className="prose dark:prose-invert max-w-none text-base font-['SF_Pro_Text']">
            <p>
              where Pt represents true probability and Pi represents implied probability for each outcome. While this method is valued for its simplicity, it does not account for the favorite-longshot bias—a well-documented phenomenon where bettors systematically overvalue underdogs and undervalue favorites.
            </p>
          </div>
          <h2 className="text-base font-medium font-['SF_Pro_Text']">Power Method</h2>
          <div className="prose dark:prose-invert max-w-none text-base font-['SF_Pro_Text']">
            <p>
              To address this limitation, the power adjustment method was also implemented. This method expresses true probabilities as:
            </p>
          </div>

          <div className="my-3">
            <MathFormula formula="P_{t}(over) = [P_{implied}(over)]^k" block={true} />
            <MathFormula formula="P_{t}(under) = [P_{implied}(under)]^k" block={true} />
          </div>

          <div className="prose dark:prose-invert max-w-none text-base font-['SF_Pro_Text']">
            <p>
              where k is an optimized parameter that ensures Pt(over) + Pt(under) = 1. The exponential nature of this approach allows for proportionally larger adjustments to underdog probabilities, better accounting for the favorite-longshot bias and potentially providing more accurate probability estimates.
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

          <div className="prose dark:prose-invert max-w-none text-base font-['SF_Pro_Text']">
            <p>
            The final preprocessing step required pairing each 'Over' bet with its corresponding 'Under' bet, as both sides are necessary for vig removal. Unpaired bets were tossed out.
            </p>
          </div>
          <h2 className="text-base font-medium font-['SF_Pro_Text']">Multiplicative Method Dataset</h2>
          <CodeBlock 
            code={`print(f"Remaining Player Props: {mult_df.shape[0]}")
mult_df.head(3)`}
            output="Remaining Player Props: 12624"
            title="Show hidden code"
          >
            {renderTable(
              ['market', 'name', 'DraftKings', 'ESPN BET', 'BetMGM', 'Pinnacle', 'grade', 'desired', 'outcome'],
              [
                {
                  market: 'Player Passing Attempts',
                  name: 'Mac Jones Under 33.5',
                  DraftKings: '0.500000',
                  'ESPN BET': '0.489879',
                  BetMGM: '0.489879',
                  Pinnacle: '0.487849',
                  grade: '1',
                  desired: '33.5',
                  outcome: '20.0'
                },
                {
                  market: 'Player Passing Attempts',
                  name: 'Justin Fields Under 27.5',
                  DraftKings: '0.500000',
                  'ESPN BET': '0.436681',
                  BetMGM: '0.500000',
                  Pinnacle: '0.466934',
                  grade: '0',
                  desired: '27.5',
                  outcome: '32.0'
                },
                {
                  market: 'Player Passing Attempts',
                  name: 'Justin Fields Under 28.5',
                  DraftKings: '0.489879',
                  'ESPN BET': '0.489879',
                  BetMGM: '0.489879',
                  Pinnacle: '0.477943',
                  grade: '0',
                  desired: '28.5',
                  outcome: '32.0'
                }
              ]
            )}
          </CodeBlock>

          <h2 className="text-base font-medium font-['SF_Pro_Text']">Power Method Dataset</h2>
          <CodeBlock 
            code={`print(f"Remaining Player Props: {power_df.shape[0]}")
power_df.head(3)`}
            output="Remaining Player Props: 12624"
            title="Show hidden code"
          >
            {renderTable(
              ['market', 'name', 'DraftKings', 'ESPN BET', 'BetMGM', 'Pinnacle', 'grade', 'desired', 'outcome'],
              [
                {
                  market: 'Player Passing Attempts',
                  name: 'Mac Jones Under 33.5',
                  DraftKings: '0.500000',
                  'ESPN BET': '0.488796',
                  BetMGM: '0.488796',
                  Pinnacle: '0.486554',
                  grade: '1',
                  desired: '33.5',
                  outcome: '20.0'
                },
                {
                  market: 'Player Passing Attempts',
                  name: 'Justin Fields Under 27.5',
                  DraftKings: '0.500000',
                  'ESPN BET': '0.430331',
                  BetMGM: '0.500000',
                  Pinnacle: '0.463311',
                  grade: '0',
                  desired: '27.5',
                  outcome: '32.0'
                },
                {
                  market: 'Player Passing Attempts',
                  name: 'Justin Fields Under 28.5',
                  DraftKings: '0.488796',
                  'ESPN BET': '0.488796',
                  BetMGM: '0.488796',
                  Pinnacle: '0.475495',
                  grade: '0',
                  desired: '28.5',
                  outcome: '32.0'
                }
              ]
            )}
          </CodeBlock>
        </section>

        {/* Analysis Section */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold font-['SF_Pro_Text']">Analysis</h2>
          <div className="prose dark:prose-invert max-w-none text-base font-['SF_Pro_Text']">
            <p>The remaining 12,624 bets are visualized below:</p>
          </div>

          <CodeBlock
            code={`import matplotlib.pyplot as plt
market_counts = power_df['market'].value_counts()
labels=[f'{label} - {value/sum(market_counts.values)*100:.1f}%' for label, value in market_counts.items()]
plt.figure(figsize=(8, 9))
plt.pie(market_counts, startangle=140, labels = labels)
plt.title('Dataset Composition: 12,624 Prop Bets', loc='center', fontsize=18)
plt.show()`}
            language="python"
          />

          <div className="flex justify-center my-6">
            <Image
              src="/articles/sportsbook-props/images/figure_16_0.png"
              alt="Dataset Composition: 12,624 Prop Bets"
              width={600}
              height={675}
              className="rounded-lg shadow-lg"
            />
          </div>

          <div className="prose dark:prose-invert max-w-none text-base font-['SF_Pro_Text']">
            <p>
              To analyze the sharpness of the four sportsbooks, I first calculated their Brier Scores. The Brier Score is the mean squared error metric for evaluating forecasted probabilities against binary outcomes, expressed as:
            </p>
          </div>

          <div className="my-3">
            <MathFormula formula="BS = \frac{1}{N} \sum^{N}_{t=1} (f_{t} - o_{t})^2" block={true} />
          </div>

          <div className="prose dark:prose-invert max-w-none text-base font-['SF_Pro_Text']">
            <p>
              Brier scores range from 0 to 1, where 0 represents perfect accuracy and 1 represents perfect inaccuracy. The lower the score, the better the prediction accuracy.
            </p>
          </div>

          <h2 className="text-base font-medium font-['SF_Pro_Text']">Power Method Brier Scores</h2>
          <CodeBlock
            code={`for book in sportsbooks:
    predicted_power = power_df[book + '_true_power']
    actual_power = power_df['grade']
    brier_score_power = np.mean((predicted_power - actual_power) ** 2)
    predicted_mult = mult_df[book + '_true_mult']
    actual_mult = mult_df['grade']
    brier_score_mult = np.mean((predicted_mult - actual_mult) ** 2)
    brier_scores[book] = [brier_score_power, brier_score_mult]
brier_scores_df = pd.DataFrame(brier_scores, index=['Power Method', 'Multiplicative Method']).T
pd.DataFrame(brier_scores_df['Power Method'].sort_values(ascending = True))`}
            language="python"
            title="Show hidden code"
            defaultExpanded={false}
            showExpandButton={true}
          />
          {renderTable(
            ['Sportsbook', 'Brier Score (Power)'],
            [
              { 'Sportsbook': 'Pinnacle', 'Brier Score (Power)': '0.247429' },
              { 'Sportsbook': 'ESPN BET', 'Brier Score (Power)': '0.248400' },
              { 'Sportsbook': 'BetMGM', 'Brier Score (Power)': '0.248942' },
              { 'Sportsbook': 'DraftKings', 'Brier Score (Power)': '0.249184' }
            ]
          )}

          <h2 className="text-base font-medium font-['SF_Pro_Text']">Multiplicative Method Brier Scores</h2>
          <CodeBlock
            code={`corr_mult = corr_df.loc['Correlation (Multiplicative)'].sort_values(ascending=False)
pd.DataFrame(corr_mult)`}
            language="python"
            title="Show hidden code"
            defaultExpanded={false}
            showExpandButton={true}
          />
          {renderTable(
            ['Sportsbook', 'Brier Score (Multiplicative)'],
            [
              { 'Sportsbook': 'Pinnacle', 'Brier Score (Multiplicative)': '0.247508' },
              { 'Sportsbook': 'ESPN BET', 'Brier Score (Multiplicative)': '0.248662' },
              { 'Sportsbook': 'DraftKings', 'Brier Score (Multiplicative)': '0.248961' },
              { 'Sportsbook': 'BetMGM', 'Brier Score (Multiplicative)': '0.249182' }
            ]
          )}

          {/* For the correlation sections, show tables but hide code */}
          <h2 className="text-base font-medium font-['SF_Pro_Text']">Power Method Correlations</h2>
          <CodeBlock
            code={`corr_power = corr_df.loc['Correlation (Power)'].sort_values(ascending=False)
pd.DataFrame(corr_power)`}
            language="python"
            title="Show hidden code"
            defaultExpanded={false}
            showExpandButton={true}
          />
          {renderTable(
            ['Sportsbook', 'Correlation (Power)'],
            [
              { 'Sportsbook': 'Pinnacle', 'Correlation (Power)': '0.131866' },
              { 'Sportsbook': 'ESPN BET', 'Correlation (Power)': '0.130737' },
              { 'Sportsbook': 'BetMGM', 'Correlation (Power)': '0.122552' },
              { 'Sportsbook': 'DraftKings', 'Correlation (Power)': '0.111551' }
            ]
          )}

          <h2 className="text-base font-medium font-['SF_Pro_Text']">Multiplicative Method Correlations</h2>
          <CodeBlock
            code={`corr_mult = corr_df.loc['Correlation (Multiplicative)'].sort_values(ascending=False)
pd.DataFrame(corr_mult)`}
            language="python"
            title="Show hidden code"
            defaultExpanded={false}
            showExpandButton={true}
          />
          {renderTable(
            ['Sportsbook', 'Correlation (Multiplicative)'],
            [
              { 'Sportsbook': 'Pinnacle', 'Correlation (Multiplicative)': '0.131301' },
              { 'Sportsbook': 'ESPN BET', 'Correlation (Multiplicative)': '0.115561' },
              { 'Sportsbook': 'BetMGM', 'Correlation (Multiplicative)': '0.110739' },
              { 'Sportsbook': 'DraftKings', 'Correlation (Multiplicative)': '0.107577' }
            ]
          )}
        </section>
        <div className="prose dark:prose-invert max-w-none text-base font-['SF_Pro_Text']">
          <p>
            This analysis confirms two key findings. First, Pinnacle consistently demonstrates the sharpest odds among the four sportsbooks. Second, the presence of favorite-longshot bias in the data suggests that sportsbooks actively account for this phenomenon. The power method proves superior to the industry-standard multiplicative method for adjusting odds, as evidenced by the Pearson correlation coefficients between each sportsbook's true odds and the distance to desired outcome metric.          </p>
          <p>
            The power method's effectiveness is further validated by its consistently higher correlation values across all sportsbooks. This finding has significant implications for the broader betting industry. Since No-Vig Fair Odds calculations form the foundation of Expected Value (EV) formulas, even a slight improvement in accuracy could meaningfully impact the profitability of Positive EV betting strategies. Further research into this methodology is warranted.          </p>
        </div>
      </article>
    </div>
  );
}