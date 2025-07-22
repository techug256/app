router.post('/register', async (req, res) => {
  const { username, email, password, capital, ref } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashed, capital });

    // Handle referrer (if any)
    if (ref) {
      const referrer = await User.findById(ref);
      if (referrer) {
        user.referrer = referrer._id;
        referrer.referrals.push(user._id);
        await referrer.save();
      }
    }

    await user.save();
    res.json({ message: 'Registration successful' });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});