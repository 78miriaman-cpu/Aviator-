export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { crypto, address, amount } = req.body || {};

    if (!crypto || !address || !amount || Number(amount) <= 0) {
      return res.status(400).json({ error: "Invalid demo withdrawal" });
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      return res.status(500).json({ error: "Telegram is not configured" });
    }

    const message =
      "🛫 DEMO WITHDRAWAL\\n\\n" +
      `Network: ${crypto}\\n` +
      `Address: ${address}\\n` +
      `Amount: ${amount}\\n\\n` +
      "⚠️ DEMO ONLY — NO REAL FUNDS";

    const response = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: message
        })
      }
    );

    const result = await response.json();

    if (!response.ok || !result.ok) {
      console.error(result);
      return res.status(500).json({
        error: "Telegram notification failed"
      });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
}
