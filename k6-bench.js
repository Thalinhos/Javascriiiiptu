import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        { duration: '30s', target: 200 }, // Sobe para 10 usuários virtuais em 30s
    ],
};

export default function () {
    const res = http.get('https://bazarelegance.com.br/');
    
    check(res, {
        'status é 200': (r) => r.status === 200,
        'tempo de resposta < 500ms': (r) => r.timings.duration < 500,
    });

    sleep(1);
}

// nao esquece de baixar o k6 pra fazer k6 run k6-bench.js
