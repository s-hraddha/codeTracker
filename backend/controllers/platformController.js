const PlatformData = require('../models/PlatformData');
const fetchPlatformData = require('../fetcher/fetchPlatformData');

exports.submitProfile = async (req, res) => {
    const { username, platform } = req.body;
    const userId = req.user._id;

    if (!username || !platform) {
        return res.status(400).json({ message: "username and platform are required" });
    }

    try {
        const data = await fetchPlatformData( platform, username);
        if (!data)
            return res.status(404).json({ message: "no data found" });
        let existingData = await PlatformData.findOne({ userId });
        if (!existingData) {
            existingData = new PlatformData({ userId });
        }

        existingData[platform] = data;
        await existingData.save();
      

        res.status(200).json({
            message: `${platform} data saved successfully`,
            data,
        });
    } catch (error) {
        console.error("submitPlatformProfile Error:", error.message);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

exports.getPlatformData = async (req, res) => {
    const userId = req.user._id;
    try {
        const data = await PlatformData.findOne({ userId });

        if (!data) {
            return res.status(404).json({ message: 'No data found ' })
        }
        
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: 'error  retrieving data', error: error.message });
    }
}

