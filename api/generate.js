const BASE = 'https://ark.cn-beijing.volces.com/api/v3';

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const key = process.env.ARK_API_KEY;

  if (!key) {
    return res.status(500).json({
      error: 'ARK_API_KEY belum diset di Vercel'
    });
  }

  try {
    const r = await fetch(`${BASE}/contents/generations/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`
      },
      body: JSON.stringify(req.body)
    });

    const text = await r.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text };
    }

    return res.status(r.status).json(data);

  } catch (e) {
    return res.status(500).json({
      error: e.message
    });
  }
};
