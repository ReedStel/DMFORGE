import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req) {
  const { offer, audience, tone } = await req.json();
  const prompt = `Write a short cold DM message for a freelancer who offers: ${offer}. Target audience: ${audience}. Tone: ${tone}. Keep it under 300 characters.`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
  });

  return new Response(JSON.stringify({ dm: completion.choices[0].message.content }), {
    headers: { 'Content-Type': 'application/json' }
  });
}