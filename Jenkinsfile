pipeline {
    agent { docker { image 'mcr.microsoft.com/playwright:v1.54.2-noble' } }
    stages {
        stage('e2e-tests') {
            steps {
                git url: 'https://github.com/angelicus112/Tests_en_Playwright.git', branch: 'main'
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

