import sys
sys.path.append('..')
from nfl_animator import NFLPlayAnimator
import json

def generate_play_data(game_id, play_id):
    # Create animator instance
    animator = NFLPlayAnimator.create()
    
    # Generate the play animation
    figure = animator.animate_play(game_id, play_id)
    
    # Convert to JSON-serializable format
    return {
        'data': figure.data,
        'layout': figure.layout
    }

if __name__ == '__main__':
    # Generate for game 2022090800, play 212
    data = generate_play_data(2022090800, 212)
    
    # Save to a JSON file
    with open('../public/play_data.json', 'w') as f:
        json.dump(data, f)
