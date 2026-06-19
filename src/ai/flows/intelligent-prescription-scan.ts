'use server';
/**
 * @fileOverview This file implements a Genkit flow for intelligent prescription scanning.
 *
 * - intelligentPrescriptionScan - A function that processes an uploaded prescription image
 *   to extract medicine details using OCR.
 * - IntelligentPrescriptionScanInput - The input type for the intelligentPrescriptionScan function.
 * - IntelligentPrescriptionScanOutput - The return type for the intelligentPrescriptionScan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IntelligentPrescriptionScanInputSchema = z.object({
  prescriptionImageDataUri: z
    .string()
    .describe(
      "A prescription image, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type IntelligentPrescriptionScanInput = z.infer<
  typeof IntelligentPrescriptionScanInputSchema
>;

const IntelligentPrescriptionScanOutputSchema = z.object({
  medicines: z.array(
    z.object({
      name: z.string().describe('The name of the medicine.'),
      dosage: z.string().describe('The dosage of the medicine (e.g., "10mg", "once daily").'),
      quantity: z.string().describe('The quantity of the medicine (e.g., "30 tablets", "1 bottle").'),
    })
  ).describe('An array of medicines extracted from the prescription.'),
  notes: z.string().optional().describe('Any additional notes or instructions from the prescription.'),
});
export type IntelligentPrescriptionScanOutput = z.infer<
  typeof IntelligentPrescriptionScanOutputSchema
>;

export async function intelligentPrescriptionScan(
  input: IntelligentPrescriptionScanInput
): Promise<IntelligentPrescriptionScanOutput> {
  return intelligentPrescriptionScanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'intelligentPrescriptionScanPrompt',
  input: {schema: IntelligentPrescriptionScanInputSchema},
  output: {schema: IntelligentPrescriptionScanOutputSchema},
  prompt: `You are an AI assistant specialized in reading medical prescriptions.

Your task is to extract medicine names, their dosages, and quantities from the provided prescription image.
Respond with a JSON object containing an array of 'medicines', where each medicine has 'name', 'dosage', and 'quantity' fields.
If there are any general notes or instructions, include them in an optional 'notes' field.
Be as accurate as possible and ensure the extracted dosage and quantity are precise.

Prescription Image: {{media url=prescriptionImageDataUri}}`,
});

const intelligentPrescriptionScanFlow = ai.defineFlow(
  {
    name: 'intelligentPrescriptionScanFlow',
    inputSchema: IntelligentPrescriptionScanInputSchema,
    outputSchema: IntelligentPrescriptionScanOutputSchema,
  },
  async (input) => {
    const {output} = await ai.generate({
      model: 'googleai/gemini-2.5-flash-image',
      prompt: [prompt(input)],
      config: {
        responseModalities: ['TEXT'],
      },
    });
    return output as IntelligentPrescriptionScanOutput;
  }
);
