app.get('/api/total-users', async (req, res) => {
  const response = await axios.post(
    `https://analyticsdata.googleapis.com/v1beta/properties/506014482`,
    {
      metrics: [{ name: 'users' }],
      dateRanges: [{ startDate: '2023-01-01', endDate: 'today' }]
    },
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );

  const totalUsers = response.data.rows?.[0]?.metricValues?.[0]?.value || '0';
  res.json({ totalUsers });
});
