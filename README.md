# ☕ CuppaCart

A modern, full-featured mobile e-commerce application for coffee shop enthusiasts, built with React Native and Expo.

<div align="center">
  <a href="https://drive.google.com/file/d/1AnIBsx7XB_nyrPn20oZJWcIFDLxP4_uA/view?usp=drive_link" target="_blank">
      <img src="https://drive.google.com/uc?id=1OLTDf0vlP11nZU9ZbjbUviKmPH_7ric0" height="450"/>
  </a>
</div>

## 📱 Overview

CuppaCart is a complete coffee shop e-commerce solution that allows users to browse, search, and purchase coffee products. The app includes user authentication, shopping cart functionality, product reviews, payment processing, and comprehensive admin features for managing products and users.

## ✨ Features

### Customer Features
- **User Authentication** - Secure sign-up and sign-in with Firebase Authentication
-  **Product Browsing** - Browse and search through coffee products with detailed information
- *Reviews & Ratings** - View and submit product reviews with star ratings
- **Shopping Cart** - Add products to cart and manage quantities
- **Payment Processing** - Secure checkout with credit card management
- **Wishlist/Favorites** - Save favorite products for later
- **Location Services** - Location-based features for delivery
- **Order Management** - Track and view purchase history
- **User Profile** - Manage personal information and preferences
- **Security** - Password change and account security features

### Admin Features
- **Admin Dashboard** - Comprehensive admin panel for managing the platform
- **Product Management** - Add, edit, and delete products
- **User Management** - View, edit, and manage user accounts
- *Admin Creation** - Create additional admin accounts
- **Analytics** - View all products and users in one place

## 🛠️ Tech Stack

- **Frontend Framework**: React Native 0.73.2
- **Development Platform**: Expo SDK 50
- **Navigation**: React Navigation (Stack, Tabs, Drawer)
- **Backend**: Firebase (Firestore, Authentication, Storage)
- **Styling**: NativeWind (Tailwind CSS for React Native), Styled Components
- **UI Components**: React Native Elements, React Native Paper
- **State Management**: React Hooks (useState, useEffect)
- **Location Services**: Expo Location
- **Image Handling**: Expo Image Picker, React Native Image Crop Picker
- **Authentication**: Firebase Auth, Google Sign-In
- **Maps**: React Native Maps

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Firebase Account](https://firebase.google.com/) (for backend services)
- iOS Simulator (for macOS) or Android Emulator / Physical device

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cuppacart
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication, Firestore Database, and Storage
   - Copy your Firebase configuration
   - Create a `.env` file in the root directory:
     ```env
     FIREBASE_API_KEY=your_api_key
     FIREBASE_AUTH_DOMAIN=your_auth_domain
     FIREBASE_PROJECT_ID=your_project_id
     FIREBASE_STORAGE_BUCKET=your_storage_bucket
     FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
     FIREBASE_APP_ID=your_app_id
     FIREBASE_MEASUREMENT_ID=your_measurement_id
     ```

4. **Start the development server**
   ```bash
   npm start
   # or
   expo start
   ```

5. **Run on your preferred platform**
   - Press `a` for Android
   - Press `i` for iOS
   - Press `w` for web
   - Scan QR code with Expo Go app on your device

## 🔧 Configuration

### Firebase Setup

1. **Firestore Database**
   - Create collections: `users`, `products`, `cart`, `orders`, `reviews`
   - Set up appropriate security rules

2. **Authentication**
   - Enable Email/Password authentication
   - Enable Google Sign-In (optional)

3. **Storage**
   - Configure Firebase Storage for product images
   - Set up storage rules for image uploads

## 📱 Usage

### For Customers

1. **Sign Up/Sign In**: Create an account or sign in with existing credentials
2. **Browse Products**: Explore the coffee catalog on the home screen
3. **Search**: Use the search bar to find specific products
4. **View Details**: Tap on any product to see details, reviews, and ratings
5. **Add to Cart**: Add products to your shopping cart
6. **Checkout**: Proceed to checkout and add payment information
7. **Track Orders**: View your purchase history in the profile section

### For Administrators

1. **Admin Access**: Sign in with an admin account
2. **Manage Products**: Add, edit, or remove products from the admin panel
3. **Manage Users**: View and manage user accounts
4. **Create Admins**: Add new admin accounts as needed

## 🎨 Customization

- **Colors**: Modify color constants in `Conts/Color.js`
- **Fonts**: Custom fonts are available in `assets/Fonts/`
- **Styling**: The app uses NativeWind (Tailwind CSS) for styling
- **Theme**: Update app theme in `app.json` and styling files

## 📝 Scripts

- `npm start` - Start Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS device/simulator
- `npm run web` - Run on web browser


## 📄 License

MIT License - see [LICENSE](LICENSE) file for details