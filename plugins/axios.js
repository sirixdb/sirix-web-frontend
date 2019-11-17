export default function ({ $axios, redirect }) {

  $axios.defaults.httpsAgent = new https.Agent({ rejectUnauthorized: false })

  $axios.onRequest(config => {
    config.headers.common['Origin'] = 'http://ginlocalhost:3005';
    config.headers.common['Content-Type'] = 'application/json';
    config.headers.common['Accept'] = 'application/json';
    
    config.headers.put['Origin'] = 'http://localhost:3005';
    config.headers.put['Content-Type'] = 'application/json';
    config.headers.put['Accept'] = 'application/json';
    
    config.headers.post['Origin'] = 'http://localhost:3005';
    config.headers.post['Content-Type'] = 'application/json';
    config.headers.post['Accept'] = 'application/json';

    config.headers.del['Origin'] = 'http://localhost:3005';
    config.headers.del['Content-Type'] = 'application/json';
    config.headers.del['Accept'] = 'application/json';
  });

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status);
    if (code === 401) {
      redirect('https://localhost:9443/user/authorize');
    }
  });
}
