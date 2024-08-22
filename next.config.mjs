/** @type {import('next').NextConfig} */
const nextConfig = {
  //  output:"export",
    // experimental:{
    //     appDir:true
    // },
    images:{
        //domains:["avatars.githubusercontent.com","lh3.googleusercontent.com","res.cloudinary.com"]
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'res.cloudinary.com',
              pathname: '**',
            },
          ],
    },
    reactStrictMode:true
};

export default nextConfig;
``