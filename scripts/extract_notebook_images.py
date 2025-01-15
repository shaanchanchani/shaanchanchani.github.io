import json
import base64
import os

def extract_images_from_notebook(notebook_path, output_dir):
    # Create output directory if it doesn't exist
    os.makedirs(output_dir, exist_ok=True)
    
    # Read the notebook
    with open(notebook_path, 'r') as f:
        notebook = json.load(f)
    
    image_count = 0
    for cell_num, cell in enumerate(notebook['cells']):
        if 'outputs' in cell:
            for output_num, output in enumerate(cell['outputs']):
                if 'data' in output and 'image/png' in output['data']:
                    # Get the image data
                    img_data = output['data']['image/png']
                    
                    # Decode the base64 string
                    img_bytes = base64.b64decode(img_data)
                    
                    # Generate a filename
                    filename = f'figure_{cell_num}_{output_num}.png'
                    filepath = os.path.join(output_dir, filename)
                    
                    # Save the image
                    with open(filepath, 'wb') as img_file:
                        img_file.write(img_bytes)
                    
                    print(f'Saved {filename}')
                    image_count += 1
    
    print(f'\nExtracted {image_count} images from the notebook')

# Extract images from your notebook
notebook_path = 'quantchallenge_shaan_chanchani.ipynb'
output_dir = 'app/articles/sportsbook-props/images'
extract_images_from_notebook(notebook_path, output_dir)
