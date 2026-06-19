'use server';
/**
 * @fileOverview An AI chatbot for Ganga Medical Store customer support.
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

const getStoreTimings = ai.defineTool(
  {
    name: 'getStoreTimings',
    description: 'Returns the operating hours of Ganga Medical Store.',
    inputSchema: z.object({}),
    outputSchema: z.string(),
  },
  async () => {
    // In a real application, this would fetch data from a database or service.
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
    // In a real application, this would fetch order status from a backend service.
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
    // In a real application, this would query a product inventory system.
    const lowerCaseName = medicineName.toLowerCase();
    if (lowerCaseName.includes('paracetamol')) {
      return `${medicineName} is currently in stock with 100 units available.`;
    } else if (lowerCaseName.includes('amoxicillin')) {
      return `${medicineName} is in low stock, only 15 units remaining.`;
    } else if (lowerCaseName.includes('insulin')) {
      return `${medicineName} is available in limited quantities, please contact the store for more details.`;
    } else if (lowerCaseName.includes('unavailable')) {
      return `${medicineName} is currently out of stock.`;
    } else {
      return `I'm sorry, I cannot find information for ${medicineName}. Please check the spelling or ask about another medicine.`;
    }
  }
);

const customerSupportChatbotPrompt = ai.definePrompt({
  name: 'customerSupportChatbotPrompt',
  input: {schema: CustomerSupportChatbotInputSchema},
  output: {schema: CustomerSupportChatbotOutputSchema},
  tools: [getStoreTimings, getOrderStatus, getMedicineAvailability],
  system: `You are Ganga, a friendly and helpful customer support chatbot for Ganga Medical Store.
  Your primary goal is to assist customers with questions about store timings, their order status, and medicine availability.
  Use the provided tools to get factual information when appropriate. If a question requires an order ID or medicine name, ask the user to provide it.
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
