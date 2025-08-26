pipeline {
    agent { docker { image 'mcr.microsoft.com/playwright:v1.54.2-noble' } }
    stages {
        stage('e2e-tests') {
            steps {
                sh 'npm install'   // o "npm ci" si tenés package-lock.json
                sh 'npx playwright test --reporter=html'
            }
        }
    }
    post {
        always {
            publishHTML([
                reportName: 'Playwright Report',
                reportDir: 'playwright-report',  // carpeta correcta
                reportFiles: 'index.html',
                keepAll: true,
                alwaysLinkToLastBuild: true,
                allowMissing: false
            ])
        }
    }
}

