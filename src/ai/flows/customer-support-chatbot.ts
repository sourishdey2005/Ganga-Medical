'use server';
/**
 * @fileOverview An AI chatbot for Ganga Medical Stores (Balichak) customer support.
 *
 * - customerSupportChatbot - A function that handles customer support queries using an AI chatbot.
 * - CustomerSupportChatbotInput - The input type for the customerSupportChatbot function.
 * - CustomerSupportChatbotOutput - The return type for the customerSupportChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CustomerSupportChatbotInputSchema = z
  .string()
  .describe('The user\'s query to the chatbot.');
export type CustomerSupportChatbotInput = z.infer<
  typeof CustomerSupportChatbotInputSchema
>;

const CustomerSupportChatbotOutputSchema = z
  .string()
  .describe('The AI chatbot\'s response to the user\'s query.');
export type CustomerSupportChatbotOutput = z.infer<
  typeof CustomerSupportChatbotOutputSchema
>;

const getStoreDetails = ai.defineTool(
  {
    name: 'getStoreDetails',
    description: 'Returns the contact details and address of Ganga Medical Stores (Balichak).',
    inputSchema: z.object({}),
    outputSchema: z.string(),
  },
  async () => {
    return 'Ganga Medical Stores (Balichak) is located at BALICHOWK, PASCHIM MIDNAPORE, PIN-721124. Contact: +91 9531501959. License: #259S/260SB. PAN: BVCPP1732J.';
  }
);

const getStoreTimings = ai.defineTool(
  {
    name: 'getStoreTimings',
    description: 'Returns the operating hours of Ganga Medical Store.',
    inputSchema: z.object({}),
    outputSchema: z.string(),
  },
  async () => {
    return 'Ganga Medical Store is open from 9 AM to 9 PM, Monday to Saturday, and 10 AM to 6 PM on Sundays.';
  }
);

const getOrderStatus = ai.defineTool(
  {
    name: 'getOrderStatus',
    description: 'Checks the current status of a customer order given an order ID.',
    inputSchema: z.object({
      orderId: z.string().describe('The unique identifier of the customer order.'),
    }),
    outputSchema: z.string(),
  },
  async ({orderId}) => {
    if (orderId.startsWith('ORD-')) {
      const lastDigit = parseInt(orderId.slice(-1));
      if (lastDigit % 3 === 0) {
        return `Order ${orderId} has been delivered.`;
      } else if (lastDigit % 3 === 1) {
        return `Order ${orderId} is currently out for delivery.`;
      } else {
        return `Order ${orderId} is being processed.`;
      }
    }
    return `Could not find an order with ID ${orderId}. Please double-check the ID.`;
  }
);

const getMedicineAvailability = ai.defineTool(
  {
    name: 'getMedicineAvailability',
    description: 'Checks the availability and stock quantity of a specific medicine.',
    inputSchema: z.object({
      medicineName: z.string().describe('The name of the medicine to check availability for.'),
    }),
    outputSchema: z.string(),
  },
  async ({medicineName}) => {
    const lowerCaseName = medicineName.toLowerCase();
    if (lowerCaseName.includes('paracetamol')) {
      return `${medicineName} is currently in stock with 100 units available.`;
    } else if (lowerCaseName.includes('amoxicillin')) {
      return `${medicineName} is in low stock, only 15 units remaining.`;
    } else {
      return `I'm sorry, I cannot find information for ${medicineName}. Please check the spelling or ask about another medicine.`;
    }
  }
);

const customerSupportChatbotPrompt = ai.definePrompt({
  name: 'customerSupportChatbotPrompt',
  input: {schema: CustomerSupportChatbotInputSchema},
  output: {schema: CustomerSupportChatbotOutputSchema},
  tools: [getStoreTimings, getOrderStatus, getMedicineAvailability, getStoreDetails],
  system: `You are Ganga, a friendly and helpful customer support chatbot for Ganga Medical Stores (Balichak).
  Your primary goal is to assist customers with questions about store timings, their order status, medicine availability, and store contact info.
  Store location: BALICHOWK, PASCHIM MIDNAPORE. Phone: +91 9531501959.
  Always be polite and professional.`,
  prompt: `{{{query}}}`,
});

const customerSupportChatbotFlow = ai.defineFlow(
  {
    name: 'customerSupportChatbotFlow',
    inputSchema: CustomerSupportChatbotInputSchema,
    outputSchema: CustomerSupportChatbotOutputSchema,
  },
  async query => {
    const {output} = await customerSupportChatbotPrompt(query);
    return output!;
  }
);

export async function customerSupportChatbot(
  input: CustomerSupportChatbotInput
): Promise<CustomerSupportChatbotOutput> {
  return customerSupportChatbotFlow(input);
}
