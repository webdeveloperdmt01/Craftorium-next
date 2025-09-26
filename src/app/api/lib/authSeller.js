import { clerkClient } from '@clerk/nextjs/server';

const authSeller = async (userId) => {
  try {
    const user = await clerkClient.users.getUser(userId);
    return user.publicMetadata?.role === 'seller';
  } catch (error) {
    console.error("AuthSeller Error:", error);
    return false; // always return boolean
  }
}

export default authSeller;
