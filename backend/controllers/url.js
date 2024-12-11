const Url = require("../models/url");
const AccessLog = require("../models/accessLog");
const axios = require("axios");

const getUrl = async (req, res) => {
    const { id } = req.params;
    console.log("Requested ID or Alias:", id);
  
    const ip = '186.19.9.130'; // IP de prueba
    let ipInfo = {};
  
    try {
      const response = await axios.get(`https://ipinfo.io/${ip}?token=692b568665ff8c`);
      ipInfo = response.data;
      console.log("IP Information:", ipInfo);
    } catch (error) {
      console.error("Error fetching IP info:", error.message);
    }
  
    const url = await Url.findOne({
      $or: [
        { _id: id },
        { customAlias: id },
      ],
    });
  
    if (url) {
      url.clicks++;
  
      // Guardar un nuevo acceso en la colección AccessLog
      const newAccessLog = new AccessLog({
        urlId: url._id,
        ip,
        city: ipInfo.city || "Unknown",
        region: ipInfo.region || "Unknown",
        country: ipInfo.country || "Unknown",
        timezone: ipInfo.timezone || "Unknown",
      });
  
      await newAccessLog.save();
      await url.save();
  
      res.redirect(url.longUrl);
    } else {
      res.status(404).json({ error: "URL no encontrada" });
    }
  };

const postUrl = async (req, res) => {
    let { longUrl, customAlias } = req.body; // Extraer el customAlias del cuerpo
    console.log("longUrl:", longUrl, "customAlias:", customAlias);
    try {
        // Validar formato del customAlias (solo letras, números y guiones)
        if (customAlias && !/^[a-zA-Z0-9-]+$/.test(customAlias)) {
            return res.status(400).json({ error: 'Invalid alias format. Only letters, numbers, and hyphens allowed.' });
        }

        // Convertir alias a minúsculas para evitar duplicados por diferencia de mayúsculas/minúsculas
        if (customAlias) {
            customAlias = customAlias.toLowerCase();
        }

        // Verificar si ya existe la URL original
        let url = await Url.findOne({ longUrl });
        if (url) {
            return res.status(201).json(url); // Si ya existe, devolver la existente
        }

        // Si hay un customAlias, verificar que no esté en uso
        if (customAlias) {
            const existingAlias = await Url.findOne({ customAlias });
            if (existingAlias) {
                return res.status(400).json({ error: 'Alias already in use' });
            }
        }

        // Crear la nueva URL con o sin customAlias
        const newUrl = new Url({ longUrl, customAlias });
        await newUrl.save();

        res.status(201).json({
            message: "URL successfully shortened",
            shortUrl: newUrl.shortUrl,
        });
    } catch (error) {
        console.error("Error al procesar la solicitud:", error);
        res.status(500).json({ error: 'Server error' });
    }
};


const getMetrics = async (req, res) => {
    const { id } = req.params;
    const url = await Url.findOne({
        $or: [
            { _id: id },
            { customAlias: id },
        ],
    });


    if (url) {
        const stats = await Url.getStatistics(url._id);
        console.log(stats);

        res.json({
            _id: url._id,
            longUrl: url.longUrl,
            shortUrl: url.shortUrl,
            customAlias: url.customAlias,
            clicks: url.clicks,
            created_at: url.created_at,
            dailyClicks: stats.dailyClicks,
            clicksByCountry: stats.clicksByCountry,
            clicksByCity: stats.clicksByCity,
        });
    } else {
        res.status(404).json({ error: "URL no encontrada" });
    }
}

module.exports = {
    getUrl,
    postUrl,
    getMetrics
}