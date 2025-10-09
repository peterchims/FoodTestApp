import { Stack } from "expo-router";
import { ClerkProvider } from "@clerk/clerk-expo";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey="YOUR_CLERK_PUBLISHABLE_KEY">
      <SafeAreaView style={{ flex: 1 }}>
        <Stack />
      </SafeAreaView>
    </ClerkProvider>
  );
}
