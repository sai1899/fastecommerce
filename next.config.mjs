const nextConfig = {
    webpack: (config) => {
      // Example: Adding a custom plugin
      config.plugins.push(new SomeWebpackPlugin());
  
      // Handle cloudflare URIs
      config.resolve.alias['cloudflare'] = path.resolve(__dirname, 'src/app/api/auth');;
  
      return config;
    },
  };
  
  export default nextConfig;