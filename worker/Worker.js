export default {
  async fetch(request, env) {
    // CORS headers
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    // Handle browser preflight requests
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: corsHeaders,
      });
    }

    // Only allow POST
    if (request.method !== "POST") {
      return new Response(
        JSON.stringify({
          error: "Use POST requests only",
        }),
        {
          status: 405,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        },
      );
    }

    try {
      const { text, language } = await request.json();

      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",

          headers: {
            Authorization: `Bearer ${env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            model: "openai/gpt-oss-120b:free",

            temperature: 0.4,

            max_tokens: 100,

            messages: [
              {
                role: "system",
                content:
                  "You are a translator. Return ONLY the translated text.",
              },

              {
                role: "user",
                content: `Translate this into ${language}: ${text}`,
              },
            ],
          }),
        },
      );

      const data = await response.json();

      // OpenRouter error handling
      if (!data.choices) {
        return new Response(JSON.stringify(data), {
          status: 500,

          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        });
      }

      return new Response(
        JSON.stringify({
          translation: data.choices[0].message.content,
        }),
        {
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        },
      );
    } catch (error) {
      return new Response(
        JSON.stringify({
          error: error.message,
        }),
        {
          status: 500,

          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        },
      );
    }
  },
};
