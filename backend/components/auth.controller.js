import User from "../models/User.models.js";

//register user
export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }
    const user = await User.create({ name, email, password });

    user.save();

    res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

//login user
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookies("token", token, {
      maxAge: 3600000 * 24,
      httpOnly: true,
      samesite: "strict",
    });

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

//logout user
export const logout = async (req, res) => {
  const id = req.user.id;
  try {
    const user = await User.findOne({ _id: id });

    res.clearCookie("auth_token", {
      httpOnly: true,
      sameSite: "Strict",
    });

    res.json({
      message: "Logout successful",
    });
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

export const getme = async (req, res) => {
  const id = req.user.id;
  try {
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};
