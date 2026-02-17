const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("../models/Product");
const User = require("../models/User");
const connectDB = require("../config/db");

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();

    const adminUser = await User.create({
      name: "Admin User",
      email: "admin@gmail.com",
      password: "12345",
      isAdmin: true
    });

const sampleProducts = [
  {
    name: "iPhone 15 Pro",
    description: "Experience the power of the A17 Pro chip with this titanium-designed smartphone. Features a 48MP main camera, always-on display, and USB-C connectivity for faster transfers. The lightweight design combined with industry-leading durability makes it perfect for everyday use. Battery life lasts up to 29 hours of video playback.",
    price: 1099,
    image: "https://images.unsplash.com/photo-1695619575474-9b45e37bc1e6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    countInStock: 8
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    description: "Unleash creativity with the built-in S Pen and 200MP camera system. The dynamic AMOLED 2X display adapts to your lighting conditions for optimal viewing. Powered by Snapdragon 8 Gen 3 processor for seamless multitasking and gaming. Titanium frame provides premium durability while keeping it lightweight.",
    price: 1199,
    image: "https://images.unsplash.com/photo-1705585174953-9b2aa8afc174?q=80&w=732&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    countInStock: 12
  },
  {
    name: "MacBook Air M3",
    description: "Supercharged by the M3 chip, this ultra-thin laptop delivers blazing-fast performance in a silent, fanless design. The 13.6-inch Liquid Retina display brings content to life with 500 nits brightness. All-day battery life up to 18 hours means you can work anywhere. Instant wake and smooth performance for all your tasks.",
    price: 1299,
    image: "https://images.unsplash.com/photo-1521661978458-5a2bec6b6e09?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    countInStock: 5
  },
  {
    name: "Sony WH-1000XM5",
    description: "Industry-leading noise cancellation adapts to your environment with Auto NC Optimizer. The new Integrated Processor V1 delivers exceptional sound quality with deep bass and clear vocals. Crystal clear hands-free calling with 4 beamforming microphones. Up to 30 hours battery life with quick charging (3 min charge = 3 hours playback).",
    price: 399,
    image: "https://images.unsplash.com/photo-1755719401908-8612266b10c2?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    countInStock: 10
  },
  {
    name: "AirPods Pro 2",
    description: "Active Noise Cancellation reduces unwanted background noise for immersive sound. Adaptive Transparency lets you hear the world around you comfortably. Touch control lets you swipe to adjust volume. Enhanced audio performance with the H2 chip delivers richer bass and clearer sound. Up to 6 hours of listening time with a single charge.",
    price: 249,
    image: "https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    countInStock: 18
  },
  {
    name: "Nike Air Max 270",
    description: "Inspired by two of Air Max icons, these sneakers feature the tallest Air unit yet for maximum cushioning. The large Air Max unit provides superior comfort with every step. Stretch inner sleeve offers a sock-like fit that's easy to get on and off. The foam midsole combines with the Air unit for lightweight cushioning.",
    price: 180,
    image: "https://images.unsplash.com/photo-1562613521-6b5293e5b0ea?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    countInStock: 20
  },
  {
    name: "Adidas Ultraboost",
    description: "Responsive Boost cushioning returns energy with every stride for an energized run. The Primeknit upper adapts to your foot's shape for a custom, supportive feel. Stretchweb outsole flexes naturally and expands on contact for an energized ride. Continental Rubber outsole gives you superior traction on wet and dry surfaces.",
    price: 190,
    image: "https://images.unsplash.com/photo-1645760330764-7f0ad753e3ea?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    countInStock: 15
  },
  {
    name: "Gaming Mechanical Keyboard",
    description: "RGB mechanical keyboard with tactile blue switches for satisfying click feedback. Per-key RGB backlighting with 16.8 million colors creates stunning lighting effects. Durable construction rated for 50 million keystrokes ensures long-lasting reliability. Dedicated media controls and wrist rest included for comfort during long gaming sessions.",
    price: 89,
    image: "https://images.unsplash.com/photo-1690439445354-c0dce881a634?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    countInStock: 25
  },
  {
    name: "Wireless Gaming Mouse",
    description: "High precision wireless mouse with customizable DPI up to 16,000 for pixel-perfect aiming. 6 programmable buttons let you customize controls for different games. 70-hour battery life ensures you won't run out of power mid-game. Ultra-fast 1ms wireless connection eliminates lag for competitive gaming.",
    price: 59,
    image: "https://images.unsplash.com/photo-1631749352438-7d576312185d?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    countInStock: 30
  },
  {
    name: "Smart Fitness Watch",
    description: "Track heart rate, steps, sleep, and workouts with precision sensors. Built-in GPS tracks your outdoor activities without needing your phone. 20+ sport modes with detailed analytics for swimming, running, cycling and more. 7-day battery life and 5 ATM water resistance for all-day wear and swim tracking.",
    price: 199,
    image: "https://images.unsplash.com/photo-1669480380743-f76990b9bc44?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    countInStock: 14
  },
  {
    name: "Bluetooth Speaker",
    description: "Portable waterproof speaker with IPX7 rating for poolside and outdoor use. Deep bass and 360° sound fill any room with rich audio. 20-hour battery life keeps the music going all day and night. Built-in microphone for hands-free calls and voice assistant access. Pair two speakers for stereo sound.",
    price: 129,
    image: "https://images.unsplash.com/photo-1529359744902-86b2ab9edaea?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    countInStock: 22
  },
  {
    name: "4K Smart LED TV",
    description: "Ultra HD smart TV with Dolby Vision support for stunning color and contrast. Built-in streaming apps for Netflix, Prime Video, YouTube and more. Voice control compatibility with Alexa and Google Assistant. 60Hz refresh rate with motion smoothing for sports and action movies.",
    price: 799,
    image: "https://images.unsplash.com/photo-1615210230840-69c07c13b4d1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    countInStock: 7
  },
  {
    name: "Dell XPS 13",
    description: "Premium ultrabook with InfinityEdge display for a nearly borderless viewing experience. 11th Gen Intel Core processor delivers responsive performance for productivity tasks. Thin and light design at just 2.8 pounds makes it ultra-portable. Long battery life up to 14 hours keeps you productive all day.",
    price: 1399,
    image: "https://images.unsplash.com/photo-1720556405438-d67f0f9ecd44?q=80&w=830&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    countInStock: 6
  },
  {
    name: "Canon EOS R6 Camera",
    description: "Professional mirrorless camera with 4K 60p video support for stunning footage. 20MP full-frame sensor excels in low-light conditions up to ISO 102400. Dual Pixel CMOS AF II covers entire frame with fast, accurate autofocus. 5-axis in-body image stabilization keeps shots steady without a tripod.",
    price: 2499,
    image: "https://images.unsplash.com/photo-1658715493106-026578f35262?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    countInStock: 4
  },
  {
    name: "Leather Travel Backpack",
    description: "Premium full-grain leather backpack for work and travel with timeless style. Padded laptop compartment fits up to 15.6-inch devices securely. Multiple organizer pockets keep cables, pens and accessories tidy. Durable brass hardware and water-resistant lining protect your valuables.",
    price: 149,
    image: "https://images.unsplash.com/photo-1622560257067-108402fcedc0?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    countInStock: 16
  },
  {
    name: "Wireless Charging Pad",
    description: "Fast Qi wireless charger delivers 15W fast charging for compatible smartphones. Sleek, non-slip design with LED charging indicator. Universal compatibility with all Qi-enabled devices including phones and earbuds. Safety features include over-voltage, over-current and temperature protection.",
    price: 39,
    image: "https://images.unsplash.com/photo-1633381638729-27f730955c23?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    countInStock: 35
  },
  {
    name: "PlayStation 5",
    description: "Next-gen gaming console with ultra-fast SSD for lightning loading times. Stunning 4K graphics at up to 120fps with ray tracing support. DualSense controller with haptic feedback and adaptive triggers for immersive gameplay. 825GB internal storage with expandable SSD slot. Includes DualSense wireless controller.",
    price: 499,
    image: "https://images.unsplash.com/photo-1610119260051-a8d0b3a57e5e?q=80&w=685&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    countInStock: 9
  },
  {
    name: "Xbox Series X",
    description: "Most powerful Xbox ever with 12 teraflops of processing power. True 4K gaming at up to 120fps with hardware-accelerated ray tracing. 1TB custom SSD drastically reduces load times. Quick Resume lets you switch between multiple games instantly. Includes one Xbox Wireless Controller.",
    price: 499,
    image: "https://images.unsplash.com/photo-1683823362932-6f7599661d22?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    countInStock: 11
  },
  {
    name: "VR Headset",
    description: "Immersive virtual reality experience with 4K resolution and 110° field of view. Inside-out tracking eliminates need for external sensors for easy setup. 6DOF controllers provide natural interaction with precise tracking. Compatible with thousands of VR games and experiences on major platforms.",
    price: 349,
    image: "https://images.unsplash.com/photo-1702471897393-47ec1ba1192b?q=80&w=740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    countInStock: 13
  },
  {
    name: "Premium Office Chair",
    description: "Ergonomic office chair with adjustable lumbar support for all-day comfort. Breathable mesh back keeps you cool during long work sessions. 4D adjustable armrests and seat depth customization for perfect fit. Heavy-duty construction supports up to 300 lbs with smooth-rolling casters.",
    price: 299,
    image: "https://plus.unsplash.com/premium_photo-1764298824349-28078a4a37a5?q=80&w=713&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    countInStock: 17
  }
];


    await Product.insertMany(sampleProducts);

    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

importData();
