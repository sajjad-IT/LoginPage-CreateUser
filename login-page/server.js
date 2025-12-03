const express = require('express');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());

app.post('/create-user', async (req, res) => {
    try {
        const response = await fetch(
            'https://xivra.pk/auth/api/v1/users/create_user.php',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(req.body)
            }
        );

        const data = await response.json();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    console.log('Request proxied to external API');
});

app.listen(5000, () => console.log("Proxy running on port 5000"));
