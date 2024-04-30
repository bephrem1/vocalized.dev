module.exports = {
  redirects: async () => {
    return [
      {
        source: '/x',
        destination: 'https://twitter.com/notbenyam',
        permanent: true
      },
      {
        source: '/twitter',
        destination: 'https://twitter.com/notbenyam',
        permanent: true
      },
      {
        source: '/bephrem',
        destination: 'https://bephrem.com',
        permanent: true
      }
    ];
  }
};
