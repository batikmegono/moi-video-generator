const BASE = 'https://ark.cn-beijing.volces.com/api/v3';

module.exports = async (req, res) => {
  const key = process.env.ARK_API_KEY;

  if (!key) {
    return res.status(500).json({
      error: 'ARK_API_KEY belum diset di Vercel'
    });
  }

  const taskId = req.query.id;

  if (!taskId) {
    return res.status(400).json({
      error: 'Task ID tidak ditemukan'
    });
  }

  try {
    const r = await fetch(
      `${BASE}/contents/generations/tasks/${encodeURIComponent(taskId)}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${key}`
        }
      }
    );

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
