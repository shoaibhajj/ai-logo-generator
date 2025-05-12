export default {
  DESIGN_IDEA_PROMPT:
    "Based on Logo of type {logoType} Generate a text prompt to create Logo for Logo title/Brand name : {logoTitle} with decription: {logoDesc} and refering to prompt: {logoPrompt}. Give me 4/5 Suggestion of logo idea (each idea with maximum 4-5 words), Result in JSON format with ideas field",
  LOGO_PROMPT:
    "Generate a text prompt to create a single, detailed logo design for the brand name: {logoTitle}, with the following description: {logoDesc}. Use a color combination of {logoColor}. Integrate the core idea: {logoIdea}, and apply the design inspiration: {logoDesign}. This should result in one single, centered logo on a clean background, with no collage or multiple images. Referring to this Logo Prompt: {logoPrompt}. Ensure only one logo is generated, no split frames, no image grids, clean minimal or gradient background, and no extra UI elements or text overlays. Return result as JSON with only one field: prompt.",
};
