module.exports = async function (context, req) {
  const { text = '' } = req.body || {};
  const score = Math.min(0.99, text.length ? 0.2 + (text.length % 50)/100 : 0.1);
  context.res = { body: { similar: score, note: 'Demo stub – replace with Azure ML/FAISS service' } };
}
