// OpenClaw Mission Control v3.0 - Enhanced JavaScript

class MissionControlV3 {
    constructor() {
        this.initialize();
        this.setupEventListeners();
        this.startSimulation();
    }

    initialize() {
        // DOM Elements
        this.currentTime = document.getElementById('current-time');
        this.currentDate = document.getElementById('current-date');
        this.activityList = document.getElementById('activity-list');
        this.commandHistory = document.getElementById('command-history');
        this.commandField = document.getElementById('command-field');
        this.dataStream = document.getElementById('data-stream');
        
        // Metrics
        this.cpuValue = document.getElementById('cpu-value');
        this.memoryValue = document.getElementById('memory-value');
        this.networkValue = document.getElementById('network-value');
        this.agentValue = document.getElementById('agent-value');
        
        // Charts
        this.responseChart = null;
        this.successChart = null;
        
        // State
        this.activities = [];
        this.commands = [];
        this.metrics = {
            cpu: 42,
            memory: 1.2,
            network: 45,
            agentLoad: 68
        };
        
        this.agentStatus = {
            github: 'active',
            coding: 'busy',
            research: 'idle',
            monitoring: 'active'
        };
        
        this.agentLoads = {
            github: 85,
            coding: 92,
            research: 42,
            monitoring: 68
        };
        
        // Initialize
        this.updateTime();
        setInterval(() => this.updateTime(), 1000);
        
        this.generateInitialActivities();
        this.initializeCharts();
        this.startMetricsAnimation();
    }

    updateTime() {
        const now = new Date();
        
        // Update time
        const timeString = now.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        this.currentTime.textContent = timeString;
        
        // Update date
        const dateString = now.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        }).toUpperCase();
        this.currentDate.textContent = dateString;
    }

    initializeCharts() {
        // Response Time Chart
        const responseCtx = document.getElementById('response-chart').getContext('2d');
        this.responseChart = new Chart(responseCtx, {
            type: 'line',
            data: {
                labels: Array.from({length: 10}, (_, i) => `${i * 5}m`),
                datasets: [{
                    label: 'Response Time (ms)',
                    data: [142, 138, 145, 132, 128, 135, 142, 148, 140, 136],
                    borderColor: '#00ff9d',
                    backgroundColor: 'rgba(0, 255, 157, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#a0a0c0'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#a0a0c0'
                        }
                    }
                }
            }
        });

        // Success Rate Chart
        const successCtx = document.getElementById('success-chart').getContext('2d');
        this.successChart = new Chart(successCtx, {
            type: 'bar',
            data: {
                labels: ['GitHub', 'Coding', 'Research', 'Monitoring', 'Security', 'Deploy'],
                datasets: [{
                    label: 'Success Rate (%)',
                    data: [98.7, 99.2, 97.8, 99.5, 98.9, 99.1],
                    backgroundColor: [
                        'rgba(0, 255, 157, 0.7)',
                        'rgba(0, 184, 255, 0.7)',
                        'rgba(255, 0, 170, 0.7)',
                        'rgba(255, 170, 0, 0.7)',
                        'rgba(255, 0, 85, 0.7)',
                        'rgba(0, 255, 157, 0.7)'
                    ],
                    borderColor: [
                        '#00ff9d',
                        '#00b8ff',
                        '#ff00aa',
                        '#ffaa00',
                        '#ff0055',
                        '#00ff9d'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#a0a0c0'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#a0a0c0'
                        }
                    }
                }
            }
        });
    }

    generateInitialActivities() {
        const initialActivities = [
            {
                agent: 'GitHub Agent',
                action: 'Successfully deployed mission control dashboard v3.0',
                time: '2 minutes ago',
                type: 'deploy'
            },
            {
                agent: 'Coding Agent',
                action: 'Optimized rendering performance by 42%',
                time: '5 minutes ago',
                type: 'optimize'
            },
            {
                agent: 'Research Agent',
                action: 'Completed analysis of 15 technical documents',
                time: '12 minutes ago',
                type: 'research'
            },
            {
                agent: 'Monitoring Agent',
                action: 'Detected and resolved network latency spike',
                time: '25 minutes ago',
                type: 'monitor'
            },
            {
                agent: 'System',
                action: 'Performed routine security audit - All systems secure',
                time: '1 hour ago',
                type: 'security'
            }
        ];

        initialActivities.forEach(activity => {
            this.addActivity(activity);
        });
    }

    addActivity(activity) {
        this.activities.unshift(activity);
        if (this.activities.length > 8) {
            this.activities.pop();
        }
        this.renderActivities();
    }

    renderActivities() {
        this.activityList.innerHTML = '';
        
        this.activities.forEach((activity, index) => {
            const activityElement = document.createElement('div');
            activityElement.className = 'activity-item';
            activityElement.style.animationDelay = `${index * 0.1}s`;
            
            const typeColors = {
                deploy: '#00ff9d',
                optimize: '#00b8ff',
                research: '#ff00aa',
                monitor: '#ffaa00',
                security: '#ff0055'
            };
            
            activityElement.innerHTML = `
                <div class="activity-header">
                    <span class="activity-agent">${activity.agent}</span>
                    <span class="activity-time">${activity.time}</span>
                </div>
                <div class="activity-action">${activity.action}</div>
            `;
            
            activityElement.style.borderLeftColor = typeColors[activity.type] || '#00ff9d';
            this.activityList.appendChild(activityElement);
        });
    }

    startMetricsAnimation() {
        // Update metrics every 3-5 seconds
        setInterval(() => {
            this.updateMetrics();
        }, 3000 + Math.random() * 2000);
        
        // Update charts every 10 seconds
        setInterval(() => {
            this.updateCharts();
        }, 10000);
    }

    updateMetrics() {
        // Simulate realistic metric fluctuations
        this.metrics.cpu = this.clampValue(this.metrics.cpu + (Math.random() * 6 - 3), 20, 85);
        this.metrics.memory = this.clampValue(this.metrics.memory + (Math.random() * 0.2 - 0.1), 0.8, 3.5);
        this.metrics.network = this.clampValue(this.metrics.network + (Math.random() * 10 - 5), 20, 100);
        this.metrics.agentLoad = this.clampValue(this.metrics.agentLoad + (Math.random() * 8 - 4), 40, 90);
        
        // Update agent loads
        Object.keys(this.agentLoads).forEach(agent => {
            this.agentLoads[agent] = this.clampValue(
                this.agentLoads[agent] + (Math.random() * 10 - 5),
                30,
                95
            );
            
            // Update progress bars
            const progressFill = document.querySelector(`.agent-card[data-agent="${agent}"] .progress-fill`);
            if (progressFill) {
                progressFill.style.width = `${this.agentLoads[agent]}%`;
            }
            
            const progressText = document.querySelector(`.agent-card[data-agent="${agent}"] .progress-text`);
            if (progressText) {
                progressText.textContent = `${Math.round(this.agentLoads[agent])}% Load`;
            }
        });
        
        // Update DOM
        this.cpuValue.textContent = `${Math.round(this.metrics.cpu)}%`;
        this.memoryValue.textContent = `${this.metrics.memory.toFixed(1)}/4.0 GB`;
        this.networkValue.textContent = `${Math.round(this.metrics.network)} KB/s`;
        this.agentValue.textContent = `${Math.round(this.metrics.agentLoad)}%`;
        
        // Update gauge needles
        document.querySelectorAll('.gauge-needle').forEach((needle, index) => {
            const values = [this.metrics.cpu, 30, this.metrics.network / 100 * 100, this.metrics.agentLoad];
            needle.style.transform = `translate(-50%, -100%) rotate(${values[index] * 3.6 - 90}deg)`;
        });
        
        // Update data stream status
        const streamStates = ['ACTIVE', 'PROCESSING', 'STREAMING', 'SYNCING'];
        this.dataStream.textContent = streamStates[Math.floor(Math.random() * streamStates.length)];
        
        // Randomly generate new activity
        if (Math.random() > 0.7) {
            this.generateRandomActivity();
        }
        
        // Randomly change agent status
        if (Math.random() > 0.8) {
            this.randomizeAgentStatus();
        }
    }

    updateCharts() {
        // Update response time chart
        const responseData = this.responseChart.data.datasets[0].data;
        responseData.shift();
        responseData.push(130 + Math.random() * 20);
        this.responseChart.update();
        
        // Update success rate chart
        const successData = this.successChart.data.datasets[0].data;
        successData.forEach((value, index) => {
            successData[index] = this.clampValue(value + (Math.random() * 2 - 1), 97, 100);
        });
        this.successChart.update();
    }

    clampValue(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    generateRandomActivity() {
        const agents = [
            { name: 'GitHub Agent', type: 'deploy' },
            { name: 'Coding Agent', type: 'optimize' },
            { name: 'Research Agent', type: 'research' },
            { name: 'Monitoring Agent', type: 'monitor' },
            { name: 'Security Agent', type: 'security' },
            { name: 'Deployment Agent', type: 'deploy' }
        ];
        
        const actions = {
            deploy: [
                'Deployed new microservice to production',
                'Updated deployment pipeline configuration',
                'Rolled out security patches to all servers',
                'Completed CI/CD pipeline optimization'
            ],
            optimize: [
                'Reduced API response time by 28%',
                'Optimized database queries for better performance',
                'Implemented caching layer for frequently accessed data',
                'Refactored critical path algorithms'
            ],
            research: [
                'Analyzed user behavior patterns from latest data',
                'Completed market research for new feature',
                'Generated insights from A/B testing results',
                'Compiled competitive analysis report'
            ],
            monitor: [
                'Detected and mitigated DDoS attack attempt',
                'Identified memory leak in service container',
                'Monitored system health during peak load',
                'Generated performance optimization recommendations'
            ],
            security: [
                'Completed vulnerability assessment scan',
                'Updated firewall rules for enhanced security',
                'Performed penetration testing on API endpoints',
                'Implemented new authentication protocols'
            ]
        };
        
        const agent = agents[Math.floor(Math.random() * agents.length)];
        const actionList = actions[agent.type];
        const action = actionList[Math.floor(Math.random() * actionList.length)];
        
        const timeOptions = ['just now', '1 minute ago', '2 minutes ago', '3 minutes ago'];
        const time = timeOptions[Math.floor(Math.random() * timeOptions.length)];
        
        this.addActivity({
            agent: agent.name,
            action: action,
            time: time,
            type: agent.type
        });
    }

    randomizeAgentStatus() {
        const agents = ['github', 'coding', 'research', 'monitoring'];
        const statuses = ['active', 'busy', 'idle'];
        
        const agent = agents[Math.floor(Math.random() * agents.length)];
        const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
        
        if (newStatus !== this.agentStatus[agent]) {
            this.agentStatus[agent] = newStatus;
            
            // Update UI
            const statusElement = document.querySelector(`.agent-card[data-agent="${agent}"] .agent-status`);
            if (statusElement) {
                statusElement.className = `agent-status ${newStatus}`;
                
                // Add pulse animation
                statusElement.style.animation = 'none';
                setTimeout(() => {
                    statusElement.style.animation = 'pulse 2s infinite';
                }, 10);
            }
            
            // Log activity
            const agentNames = {
                github: 'GitHub Agent',
                coding: 'Coding Agent',
                research: 'Research Agent',
                monitoring: 'Monitoring Agent'
            };
            
            this.addActivity({
                agent: agentNames[agent],
                action: `Status changed to ${newStatus.toUpperCase()}`,
                time: 'just now',
                type: 'monitor'
            });
        }
    }

    setupEventListeners() {
        // Command input
        this.commandField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.executeCommand();
            }
        });
        
        document.getElementById('btn-send-command').addEventListener('click', () => {
            this.executeCommand();
        });
        
        // Command suggestions
        document.querySelectorAll('.suggestion').forEach(suggestion => {
            suggestion.addEventListener('click', (e) => {
                this.commandField.value = e.target.textContent;
                this.commandField.focus();
            });
        });
        
        // Agent cards
        document.querySelectorAll('.agent-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.btn-agent')) {
                    const agent = card.dataset.agent;
                    this.showAgentDetails(agent);
                }
            });
        });
        
        // Agent buttons
        document.querySelectorAll('.btn-agent').forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const card = e.target.closest('.agent-card');
                const agent = card.dataset.agent;
                
                if (e.target.closest('[title="View Details"]')) {
                    this.showAgentDetails(agent);
                } else if (e.target.closest('[title="Restart"]')) {
                    this.restartAgent(agent);
                }
            });
        });
        
        // Task queue controls
        document.getElementById('btn-pause-queue').addEventListener('click', () => {
            this.toggleQueuePause();
        });
        
        document.getElementById('btn-clear-queue').addEventListener('click', () => {
            this.clearTaskQueue();
        });
        
        document.getElementById('btn-add-task').addEventListener('click', () => {
            this.showTaskModal();
        });
        
        // Task nodes
        document.querySelectorAll('.task-node').forEach(node => {
            node.addEventListener('click', () => {
                const taskId = node.dataset.task;
                this.showTaskDetails(taskId);
            });
        });
        
        // Alert button
        document.getElementById('btn-alerts').addEventListener('click', () => {
            this.showAlertModal();
        });
        
        // Command button
        document.getElementById('btn-command').addEventListener('click', () => {
            this.commandField.focus();
        });
        
        // Fullscreen button
        document.getElementById('btn-fullscreen').addEventListener('click', () => {
            this.toggleFullscreen();
        });
        
        // Security button
        document.getElementById('btn-security').addEventListener('click', () => {
            this.showSecurityModal();
        });
        
        // Settings button
        document.getElementById('btn-settings').addEventListener('click', () => {
            this.showSettingsModal();
        });
        
        // Modal close buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-close') || 
                e.target.classList.contains('modal') && e.target.id) {
                this.closeAllModals();
            }
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl + / for help
            if (e.ctrlKey && e.key === '/') {
                e.preventDefault();
                this.showKeyboardShortcuts();
            }
            
            // Escape to close modals
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
            
            // Ctrl + F for fullscreen
            if (e.ctrlKey && e.key === 'f') {
                e.preventDefault();
                this.toggleFullscreen();
            }
            
            // Focus command field with Ctrl+K
            if (e.ctrlKey && e.key === 'k') {
                e.preventDefault();
                this.commandField.focus();
            }
        });
    }

    executeCommand() {
        const command = this.commandField.value.trim();
        if (!command) return;
        
        // Add to command history
        this.addCommandToHistory(command);
        
        // Process command
        this.processCommand(command);
        
        // Clear input
        this.commandField.value = '';
    }

    addCommandToHistory(command) {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        
        const commandEntry = document.createElement('div');
        commandEntry.className = 'command-entry';
        commandEntry.innerHTML = `
            <span class="command-prompt">$</span>
            <span class="command-text">${command}</span>
            <span class="command-time">${timeString}</span>
        `;
        
        const output = this.getCommandOutput(command);
        const outputElement = document.createElement('div');
        outputElement.className = 'command-output';
        outputElement.innerHTML = output;
        
        this.commandHistory.appendChild(commandEntry);
        this.commandHistory.appendChild(outputElement);
        
        // Scroll to bottom
        this.commandHistory.scrollTop = this.commandHistory.scrollHeight;
        
        // Add activity
        this.addActivity({
            agent: 'Command Center',
            action: `Executed command: ${command}`,
            time: 'just now',
            type: 'deploy'
        });
    }

    getCommandOutput(command) {
        const cmd = command.toLowerCase();
        let output = '';
        
        if (cmd.includes('status')) {
            output = `
                <div class="output-line">🚀 OPENCLAW MISSION CONTROL v3.0</div>
                <div class="output-line">──────────────────────────────</div>
                <div class="output-line">SYSTEM STATUS: <span style="color:#00ff9d">ONLINE</span></div>
                <div class="output-line">ACTIVE AGENTS: <span style="color:#00b8ff">8</span></div>
                <div class="output-line">CPU USAGE: <span style="color:#00ff9d">${Math.round(this.metrics.cpu)}%</span></div>
                <div class="output-line">MEMORY: <span style="color:#00b8ff">${this.metrics.memory.toFixed(1)}GB</span></div>
                <div class="output-line">NETWORK: <span style="color:#ff00aa">${Math.round(this.metrics.network)} KB/s</span></div>
                <div class="output-line">AGENT LOAD: <span style="color:#ffaa00">${Math.round(this.metrics.agentLoad)}%</span></div>
                <div class="output-line">UPTIME: <span style="color:#00ff9d">99.9%</span></div>
            `;
        } else if (cmd.includes('agent list')) {
            output = `
                <div class="output-line">🤖 ACTIVE AGENTS</div>
                <div class="output-line">────────────────</div>
                <div class="output-line">• GitHub Agent <span style="color:#00ff9d">[ACTIVE]</span> - 85% Load</div>
                <div class="output-line">• Coding Agent <span style="color:#ffaa00">[BUSY]</span> - 92% Load</div>
                <div class="output-line">• Research Agent <span style="color:#666680">[IDLE]</span> - 42% Load</div>
                <div class="output-line">• Monitoring Agent <span style="color:#00ff9d">[ACTIVE]</span> - 68% Load</div>
                <div class="output-line">• Security Agent <span style="color:#00ff9d">[ACTIVE]</span> - 75% Load</div>
                <div class="output-line">• Deployment Agent <span style="color:#00ff9d">[ACTIVE]</span> - 58% Load</div>
                <div class="output-line">• Analysis Agent <span style="color:#00ff9d">[ACTIVE]</span> - 63% Load</div>
                <div class="output-line">• Communication Agent <span style="color:#00ff9d">[ACTIVE]</span> - 47% Load</div>
            `;
        } else if (cmd.includes('deploy')) {
            output = `
                <div class="output-line">🚀 INITIATING DEPLOYMENT SEQUENCE</div>
                <div class="output-line">────────────────────────────────</div>
                <div class="output-line"><span style="color:#00ff9d">✓</span> Building artifacts...</div>
                <div class="output-line"><span style="color:#00ff9d">✓</span> Running automated tests...</div>
                <div class="output-line"><span style="color:#00ff9d">✓</span> Security scanning...</div>
                <div class="output-line"><span style="color:#00ff9d">✓</span> Deploying to production...</div>
                <div class="output-line"><span style="color:#00ff9d">✓</span> Verifying deployment...</div>
                <div class="output-line"><span style="color:#00ff9d">✓</span> Deployment successful!</div>
                <div class="output-line">────────────────────────────────</div>
                <div class="output-line">All systems operational ✅</div>
            `;
        } else if (cmd.includes('monitor')) {
            output = `
                <div class="output-line">📊 SYSTEM MONITORING DATA</div>
                <div class="output-line">─────────────────────────</div>
                <div class="output-line">• System Uptime: <span style="color:#00ff9d">99.9%</span></div>
                <div class="output-line">• Avg Response Time: <span style="color:#00b8ff">142ms</span></div>
                <div class="output-line">• Error Rate: <span style="color:#ffaa00">0.3%</span></div>
                <div class="output-line">• Active Connections: <span style="color:#00ff9d">42</span></div>
                <div class="output-line">• Data Processed Today: <span style="color:#00b8ff">2.4TB</span></div>
                <div class="output-line">• API Requests: <span style="color:#ff00aa">15,284</span></div>
                <div class="output-line">• Success Rate: <span style="color:#00ff9d">98.7%</span></div>
            `;
        } else if (cmd.includes('help')) {
            output = `
                <div class="output-line">🛠️ AVAILABLE COMMANDS</div>
                <div class="output-line">─────────────────────</div>
                <div class="output-line"><span style="color:#00ff9d">status</span> - Show system status and metrics</div>
                <div class="output-line"><span style="color:#00b8ff">agent list</span> - List all active agents</div>
                <div class="output-line"><span style="color:#ff00aa">deploy</span> - Initiate deployment sequence</div>
                <div class="output-line"><span style="color:#ffaa00">monitor</span> - Show detailed monitoring data</div>
                <div class="output-line"><span style="color:#00ff9d">clear</span> - Clear command history</div>
                <div class="output-line"><span style="color:#00b8ff">help</span> - Show this help message</div>
                <div class="output-line">─────────────────────</div>
                <div class="output-line">📌 Press Ctrl+K to focus command field</div>
                <div class="output-line">📌 Press Ctrl+/ for keyboard shortcuts</div>
            `;
        } else if (cmd.includes('clear')) {
            this.commandHistory.innerHTML = '';
            output = '<div class="output-line">Command history cleared ✅</div>';
        } else {
            output = `
                <div class="output-line"><span style="color:#ff0055">❌ Unknown command:</span> ${command}</div>
                <div class="output-line">Type <span style="color:#00ff9d">'help'</span> for available commands</div>
            `;
        }
        
        return output;
    }

    processCommand(command) {
        // Simulate processing delay
        setTimeout(() => {
            // Update metrics based on command
            if (command.includes('deploy')) {
                this.metrics.cpu = Math.min(this.metrics.cpu + 15, 95);
                this.metrics.network = Math.min(this.metrics.network + 30, 100);
                
                // Update UI
                this.cpuValue.textContent = `${Math.round(this.metrics.cpu)}%`;
                this.networkValue.textContent = `${Math.round(this.metrics.network)} KB/s`;
            }
        }, 500);
    }

    showAgentDetails(agent) {
        const agentNames = {
            github: 'GitHub Agent',
            coding: 'Coding Agent',
            research: 'Research Agent',
            monitoring: 'Monitoring Agent'
        };
        
        const agentIcons = {
            github: 'fab fa-github',
            coding: 'fas fa-code',
            research: 'fas fa-search',
            monitoring: 'fas fa-chart-line'
        };
        
        const statusColors = {
            active: '#00ff9d',
            busy: '#ffaa00',
            idle: '#666680'
        };
        
        const modal = document.getElementById('agent-modal');
        const modalBody = modal.querySelector('.modal-body');
        
        modalBody.innerHTML = `
            <div class="agent-detail">
                <div class="detail-header">
                    <div class="detail-avatar">
                        <i class="${agentIcons[agent]}"></i>
                    </div>
                    <div class="detail-info">
                        <h4>${agentNames[agent]}</h4>
                        <div class="detail-status" style="color: ${statusColors[this.agentStatus[agent]]}">
                            ${this.agentStatus[agent].toUpperCase()}
                        </div>
                    </div>
                </div>
                
                <div class="detail-metrics">
                    <div class="detail-metric">
                        <span class="metric-label">Current Load</span>
                        <span class="metric-value">${this.agentLoads[agent]}%</span>
                    </div>
                    <div class="detail-metric">
                        <span class="metric-label">Uptime</span>
                        <span class="metric-value">99.8%</span>
                    </div>
                    <div class="detail-metric">
                        <span class="metric-label">Tasks Completed</span>
                        <span class="metric-value">1,428</span>
                    </div>
                    <div class="detail-metric">
                        <span class="metric-label">Avg Response</span>
                        <span class="metric-value">142ms</span>
                    </div>
                </div>
                
                <div class="detail-stats">
                    <h5>Performance Statistics</h5>
                    <div class="stats-grid">
                        <div class="stat-item">
                            <span class="stat-label">Success Rate</span>
                            <span class="stat-value">98.7%</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">CPU Usage</span>
                            <span class="stat-value">${agent === 'coding' ? '92%' : '42%'}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Memory</span>
                            <span class="stat-value">${agent === 'research' ? '1.8GB' : '1.2GB'}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Network I/O</span>
                            <span class="stat-value">45 KB/s</span>
                        </div>
                    </div>
                </div>
                
                <div class="detail-actions">
                    <button class="btn-detail" onclick="missionControl.restartAgent('${agent}')">
                        <i class="fas fa-redo"></i> Restart Agent
                    </button>
                    <button class="btn-detail" onclick="missionControl.updateAgent('${agent}')">
                        <i class="fas fa-download"></i> Update
                    </button>
                    <button class="btn-detail danger" onclick="missionControl.stopAgent('${agent}')">
                        <i class="fas fa-stop"></i> Stop
                    </button>
                </div>
            </div>
        `;
        
        modal.classList.add('active');
    }

    restartAgent(agent) {
        const agentNames = {
            github: 'GitHub Agent',
            coding: 'Coding Agent',
            research: 'Research Agent',
            monitoring: 'Monitoring Agent'
        };
        
        this.agentStatus[agent] = 'busy';
        this.agentLoads[agent] = 10;
        
        // Update UI
        const statusElement = document.querySelector(`.agent-card[data-agent="${agent}"] .agent-status`);
        const progressFill = document.querySelector(`.agent-card[data-agent="${agent}"] .progress-fill`);
        const progressText = document.querySelector(`.agent-card[data-agent="${agent}"] .progress-text`);
        
        if (statusElement) statusElement.className = 'agent-status busy';
        if (progressFill) progressFill.style.width = '10%';
        if (progressText) progressText.textContent = '10% Load';
        
        this.addActivity({
            agent: 'System',
            action: `Restarting ${agentNames[agent]}...`,
            time: 'just now',
            type: 'deploy'
        });
        
        // Simulate restart process
        setTimeout(() => {
            this.agentStatus[agent] = 'active';
            this.agentLoads[agent] = 50 + Math.random() * 30;
            
            if (statusElement) statusElement.className = 'agent-status active';
            if (progressFill) progressFill.style.width = `${this.agentLoads[agent]}%`;
            if (progressText) progressText.textContent = `${Math.round(this.agentLoads[agent])}% Load`;
            
            this.addActivity({
                agent: 'System',
                action: `${agentNames[agent]} restarted successfully`,
                time: 'just now',
                type: 'deploy'
            });
        }, 2000);
        
        this.closeAllModals();
    }

    updateAgent(agent) {
        const agentNames = {
            github: 'GitHub Agent',
            coding: 'Coding Agent',
            research: 'Research Agent',
            monitoring: 'Monitoring Agent'
        };
        
        this.addActivity({
            agent: 'System',
            action: `Initiating update for ${agentNames[agent]}`,
            time: 'just now',
            type: 'deploy'
        });
        
        this.closeAllModals();
    }

    stopAgent(agent) {
        const agentNames = {
            github: 'GitHub Agent',
            coding: 'Coding Agent',
            research: 'Research Agent',
            monitoring: 'Monitoring Agent'
        };
        
        this.agentStatus[agent] = 'idle';
        this.agentLoads[agent] = 5;
        
        // Update UI
        const statusElement = document.querySelector(`.agent-card[data-agent="${agent}"] .agent-status`);
        const progressFill = document.querySelector(`.agent-card[data-agent="${agent}"] .progress-fill`);
        const progressText = document.querySelector(`.agent-card[data-agent="${agent}"] .progress-text`);
        
        if (statusElement) statusElement.className = 'agent-status idle';
        if (progressFill) progressFill.style.width = '5%';
        if (progressText) progressText.textContent = '5% Load';
        
        this.addActivity({
            agent: 'System',
            action: `Stopped ${agentNames[agent]}`,
            time: 'just now',
            type: 'security'
        });
        
        this.closeAllModals();
    }

    toggleQueuePause() {
        const button = document.getElementById('btn-pause-queue');
        const isPaused = button.classList.contains('paused');
        
        if (isPaused) {
            button.classList.remove('paused');
            button.innerHTML = '<i class="fas fa-pause"></i> PAUSE';
            this.resumeQueue();
        } else {
            button.classList.add('paused');
            button.innerHTML = '<i class="fas fa-play"></i> RESUME';
            this.pauseQueue();
        }
    }

    pauseQueue() {
        document.querySelectorAll('.flow-dot').forEach(dot => {
            dot.style.animationPlayState = 'paused';
        });
        
        this.addActivity({
            agent: 'System',
            action: 'Paused task queue processing',
            time: 'just now',
            type: 'monitor'
        });
    }

    resumeQueue() {
        document.querySelectorAll('.flow-dot').forEach(dot => {
            dot.style.animationPlayState = 'running';
        });
        
        this.addActivity({
            agent: 'System',
            action: 'Resumed task queue processing',
            time: 'just now',
            type: 'monitor'
        });
    }

    clearTaskQueue() {
        const taskNodes = document.querySelectorAll('.task-node');
        taskNodes.forEach(node => {
            node.style.opacity = '0.5';
            node.style.transform = 'scale(0.9)';
        });
        
        this.addActivity({
            agent: 'System',
            action: 'Cleared all tasks from queue',
            time: 'just now',
            type: 'deploy'
        });
        
        // Reset after delay
        setTimeout(() => {
            taskNodes.forEach(node => {
                node.style.opacity = '1';
                node.style.transform = 'scale(1)';
            });
        }, 1000);
    }

    showTaskModal() {
        // Create task modal
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-plus"></i> ADD NEW TASK</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="task-name">Task Name</label>
                        <input type="text" id="task-name" placeholder="Enter task name...">
                    </div>
                    <div class="form-group">
                        <label for="task-type">Task Type</label>
                        <select id="task-type">
                            <option value="code">Code Review</option>
                            <option value="research">Research</option>
                            <option value="analysis">Data Analysis</option>
                            <option value="monitor">Monitoring</option>
                            <option value="deploy">Deployment</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="task-priority">Priority</label>
                        <select id="task-priority">
                            <option value="low">Low</option>
                            <option value="medium" selected>Medium</option>
                            <option value="high">High</option>
                            <option value="critical">Critical</option>
                        </select>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-modal" onclick="missionControl.closeAllModals()">CANCEL</button>
                    <button class="btn-modal primary" onclick="missionControl.addNewTask()">ADD TASK</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    addNewTask() {
        const taskName = document.getElementById('task-name')?.value || 'New Task';
        const taskType = document.getElementById('task-type')?.value || 'code';
        const priority = document.getElementById('task-priority')?.value || 'medium';
        
        this.addActivity({
            agent: 'System',
            action: `Added new task: ${taskName} (${priority.toUpperCase()} priority)`,
            time: 'just now',
            type: 'deploy'
        });
        
        this.closeAllModals();
    }

    showTaskDetails(taskId) {
        const taskNames = {
            1: 'Code Review',
            2: 'Data Analysis',
            3: 'Web Research',
            4: 'Monitoring'
        };
        
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-tasks"></i> TASK DETAILS</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="task-detail">
                        <h4>${taskNames[taskId]}</h4>
                        <div class="task-info">
                            <div class="info-item">
                                <span class="info-label">Status:</span>
                                <span class="info-value" style="color:#ffaa00">IN PROGRESS</span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">Priority:</span>
                                <span class="info-value" style="color:#00b8ff">MEDIUM</span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">Assigned To:</span>
                                <span class="info-value">Coding Agent</span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">Estimated Time:</span>
                                <span class="info-value">15 minutes</span>
                            </div>
                        </div>
                        <div class="task-progress">
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${taskId * 25}%"></div>
                            </div>
                            <div class="progress-label">${taskId * 25}% Complete</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    showAlertModal() {
        const modal = document.getElementById('alert-modal');
        const alertList = modal.querySelector('.alert-list');
        
        alertList.innerHTML = `
            <div class="alert-item">
                <div class="alert-icon" style="color:#ff0055">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
                <div class="alert-content">
                    <div class="alert-title">High CPU Usage</div>
                    <div class="alert-desc">Coding Agent CPU at 92% for 5 minutes</div>
                    <div class="alert-time">2 minutes ago</div>
                </div>
            </div>
            <div class="alert-item">
                <div class="alert-icon" style="color:#ffaa00">
                    <i class="fas fa-network-wired"></i>
                </div>
                <div class="alert-content">
                    <div class="alert-title">Network Latency</div>
                    <div class="alert-desc">Response time increased by 45%</div>
                    <div class="alert-time">15 minutes ago</div>
                </div>
            </div>
            <div class="alert-item">
                <div class="alert-icon" style="color:#00b8ff">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="alert-content">
                    <div class="alert-title">Agent Update Available</div>
                    <div class="alert-desc">GitHub Agent v3.1.0 ready for deployment</div>
                    <div class="alert-time">1 hour ago</div>
                </div>
            </div>
        `;
        
        modal.classList.add('active');
        
        // Clear alert badge
        const alertBadge = document.querySelector('.alert-badge');
        if (alertBadge) {
            alertBadge.style.display = 'none';
        }
    }

    showSecurityModal() {
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-shield-alt"></i> SECURITY DASHBOARD</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="security-stats">
                        <div class="stat-card">
                            <div class="stat-icon" style="color:#00ff9d">
                                <i class="fas fa-check-circle"></i>
                            </div>
                            <div class="stat-content">
                                <div class="stat-value">98.7%</div>
                                <div class="stat-label">Security Score</div>
                            </div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-icon" style="color:#00b8ff">
                                <i class="fas fa-shield"></i>
                            </div>
                            <div class="stat-content">
                                <div class="stat-value">0</div>
                                <div class="stat-label">Active Threats</div>
                            </div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-icon" style="color:#ffaa00">
                                <i class="fas fa-clock"></i>
                            </div>
                            <div class="stat-content">
                                <div class="stat-value">24h</div>
                                <div class="stat-label">Last Audit</div>
                            </div>
                        </div>
                    </div>
                    <div class="security-actions">
                        <button class="btn-security" onclick="missionControl.runSecurityScan()">
                            <i class="fas fa-search"></i> Run Security Scan
                        </button>
                        <button class="btn-security" onclick="missionControl.updateFirewall()">
                            <i class="fas fa-fire"></i> Update Firewall
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    runSecurityScan() {
        this.addActivity({
            agent: 'Security Agent',
            action: 'Initiating comprehensive security scan...',
            time: 'just now',
            type: 'security'
        });
        
        this.closeAllModals();
        
        // Simulate scan
        setTimeout(() => {
            this.addActivity({
                agent: 'Security Agent',
                action: 'Security scan completed - All systems secure ✅',
                time: 'just now',
                type: 'security'
            });
        }, 3000);
    }

    updateFirewall() {
        this.addActivity({
            agent: 'Security Agent',
            action: 'Updating firewall rules and security protocols',
            time: 'just now',
            type: 'security'
        });
        
        this.closeAllModals();
    }

    showSettingsModal() {
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-cogs"></i> SYSTEM SETTINGS</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="settings-group">
                        <h4>Display Settings</h4>
                        <div class="setting-item">
                            <span class="setting-label">Theme</span>
                            <select class="setting-control">
                                <option selected>Cyberpunk (Default)</option>
                                <option>Dark Mode</option>
                                <option>Light Mode</option>
                                <option>High Contrast</option>
                            </select>
                        </div>
                        <div class="setting-item">
                            <span class="setting-label">Animation Speed</span>
                            <select class="setting-control">
                                <option selected>Normal</option>
                                <option>Fast</option>
                                <option>Slow</option>
                                <option>Disabled</option>
                            </select>
                        </div>
                    </div>
                    <div class="settings-group">
                        <h4>System Preferences</h4>
                        <div class="setting-item">
                            <label class="setting-switch">
                                <input type="checkbox" checked>
                                <span class="slider"></span>
                                <span class="setting-label">Auto-refresh metrics</span>
                            </label>
                        </div>
                        <div class="setting-item">
                            <label class="setting-switch">
                                <input type="checkbox" checked>
                                <span class="slider"></span>
                                <span class="setting-label">Show notifications</span>
                            </label>
                        </div>
                        <div class="setting-item">
                            <label class="setting-switch">
                                <input type="checkbox">
                                <span class="slider"></span>
                                <span class="setting-label">Enable sound alerts</span>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-modal" onclick="missionControl.closeAllModals()">CANCEL</button>
                    <button class="btn-modal primary" onclick="missionControl.saveSettings()">SAVE SETTINGS</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    saveSettings() {
        this.addActivity({
            agent: 'System',
            action: 'Settings updated successfully',
            time: 'just now',
            type: 'deploy'
        });
        
        this.closeAllModals();
    }

    showKeyboardShortcuts() {
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-keyboard"></i> KEYBOARD SHORTCUTS</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="shortcuts-grid">
                        <div class="shortcut-item">
                            <span class="shortcut-key">Ctrl + /</span>
                            <span class="shortcut-desc">Show this help</span>
                        </div>
                        <div class="shortcut-item">
                            <span class="shortcut-key">Esc</span>
                            <span class="shortcut-desc">Close modals</span>
                        </div>
                        <div class="shortcut-item">
                            <span class="shortcut-key">Ctrl + F</span>
                            <span class="shortcut-desc">Toggle fullscreen</span>
                        </div>
                        <div class="shortcut-item">
                            <span class="shortcut-key">Ctrl + K</span>
                            <span class="shortcut-desc">Focus command field</span>
                        </div>
                        <div class="shortcut-item">
                            <span class="shortcut-key">Ctrl + Q</span>
                            <span class="shortcut-desc">Pause/resume queue</span>
                        </div>
                        <div class="shortcut-item">
                            <span class="shortcut-key">Ctrl + C</span>
                            <span class="shortcut-desc">Clear task queue</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    toggleFullscreen() {
        const elem = document.documentElement;
        
        if (!document.fullscreenElement) {
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            }
            
            this.addActivity({
                agent: 'System',
                action: 'Entered fullscreen mode',
                time: 'just now',
                type: 'deploy'
            });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
            
            this.addActivity({
                agent: 'System',
                action: 'Exited fullscreen mode',
                time: 'just now',
                type: 'deploy'
            });
        }
    }

    closeAllModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('active');
            setTimeout(() => {
                if (modal.parentElement && modal.id !== 'agent-modal' && modal.id !== 'alert-modal') {
                    modal.remove();
                }
            }, 300);
        });
    }

    startSimulation() {
        // Start all animations
        this.startMetricsAnimation();
        
        // Add periodic activities
        setInterval(() => {
            if (Math.random() > 0.6) {
                this.generateRandomActivity();
            }
        }, 8000);
        
        // Update alert badge randomly
        setInterval(() => {
            this.updateAlertBadge();
        }, 30000);
    }

    updateAlertBadge() {
        const alertBadge = document.querySelector('.alert-badge');
        if (alertBadge) {
            const alertCount = Math.floor(Math.random() * 5);
            if (alertCount > 0) {
                alertBadge.textContent = alertCount;
                alertBadge.style.display = 'flex';
                alertBadge.style.animation = 'pulse 1s infinite';
            } else {
                alertBadge.style.display = 'none';
            }
        }
    }
}

// Initialize Mission Control
function initMissionControl() {
    window.missionControl = new MissionControlV3();
    
    // Add some CSS for modals
    const modalStyles = document.createElement('style');
    modalStyles.textContent = `
        .agent-detail, .task-detail, .security-stats, .settings-group {
            color: var(--text-primary);
        }
        
        .detail-header {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 2rem;
        }
        
        .detail-avatar {
            width: 60px;
            height: 60px;
            border-radius: 12px;
            background: linear-gradient(135deg, var(--secondary), var(--primary));
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            color: white;
        }
        
        .detail-info h4 {
            font-size: 1.5rem;
            margin-bottom: 0.5rem;
        }
        
        .detail-status {
            font-family: 'JetBrains Mono', monospace;
            font-weight: 600;
            font-size: 0.9rem;
        }
        
        .detail-metrics {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
            margin-bottom: 2rem;
        }
        
        .detail-metric {
            background: var(--bg-card);
            padding: 1rem;
            border-radius: 8px;
            text-align: center;
        }
        
        .metric-label {
            display: block;
            font-size: 0.8rem;
            color: var(--text-secondary);
            margin-bottom: 0.3rem;
        }
        
        .metric-value {
            display: block;
            font-family: 'JetBrains Mono', monospace;
            font-size: 1.2rem;
            font-weight: 600;
            color: var(--primary);
        }
        
        .detail-stats {
            margin-bottom: 2rem;
        }
        
        .detail-stats h5 {
            font-size: 1rem;
            color: var(--text-secondary);
            margin-bottom: 1rem;
        }
        
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
        }
        
        .stat-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.8rem;
            background: var(--bg-card);
            border-radius: 8px;
        }
        
        .stat-label {
            font-size: 0.9rem;
            color: var(--text-secondary);
        }
        
        .stat-value {
            font-family: 'JetBrains Mono', monospace;
            font-weight: 600;
            color: var(--primary);
        }
        
        .detail-actions {
            display: flex;
            gap: 1rem;
            justify-content: center;
        }
        
        .btn-detail {
            padding: 0.5rem 1rem;
            border: none;
            border-radius: 8px;
            background: var(--bg-card);
            color: var(--text-primary);
            cursor: pointer;
            transition: all 0.3s ease;
            font-family: 'Inter', sans-serif;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .btn-detail:hover {
            transform: translateY(-2px);
            box-shadow: var(--glow-primary);
        }
        
        .btn-detail.danger {
            background: var(--danger);
            color: white;
        }
        
        .btn-detail.danger:hover {
            background: var(--danger-dark);
        }
        
        .task-info {
            margin-bottom: 2rem;
        }
        
        .info-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.8rem;
            padding-bottom: 0.8rem;
            border-bottom: 1px solid var(--border-color);
        }
        
        .info-label {
            color: var(--text-secondary);
        }
        
        .info-value {
            font-weight: 600;
            font-family: 'JetBrains Mono', monospace;
        }
        
        .task-progress {
            margin-bottom: 2rem;
        }
        
        .progress-bar {
            height: 8px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 4px;
            overflow: hidden;
            margin-bottom: 0.5rem;
        }
        
        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, var(--primary), var(--secondary));
            border-radius: 4px;
            transition: width 1s ease;
        }
        
        .progress-label {
            text-align: center;
            font-size: 0.9rem;
            color: var(--text-secondary);
        }
        
        .security-stats {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1rem;
            margin-bottom: 2rem;
        }
        
        .stat-card {
            background: var(--bg-card);
            border-radius: 12px;
            padding: 1rem;
            text-align: center;
        }
        
        .stat-icon {
            font-size: 2rem;
            margin-bottom: 0.5rem;
        }
        
        .stat-value {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--text-primary);
            display: block;
        }
        
        .stat-label {
            font-size: 0.8rem;
            color: var(--text-secondary);
        }
        
        .security-actions {
            display: flex;
            gap: 1rem;
            justify-content: center;
        }
        
        .btn-security {
            padding: 0.5rem 1rem;
            border: none;
            border-radius: 8px;
            background: var(--bg-card);
            color: var(--text-primary);
            cursor: pointer;
            transition: all 0.3s ease;
            font-family: 'Inter', sans-serif;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .btn-security:hover {
            background: var(--primary);
            color: var(--bg-dark);
        }
        
        .settings-group {
            margin-bottom: 2rem;
        }
        
        .settings-group h4 {
            font-size: 1rem;
            color: var(--text-secondary);
            margin-bottom: 1rem;
        }
        
        .setting-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
            padding: 0.8rem;
            background: var(--bg-card);
            border-radius: 8px;
        }
        
        .setting-label {
            font-size: 0.9rem;
            color: var(--text-primary);
        }
        
        .setting-control {
            background: var(--bg-dark);
            border: 1px solid var(--border-color);
            color: var(--text-primary);
            padding: 0.3rem 0.5rem;
            border-radius: 4px;
            font-family: 'Inter', sans-serif;
        }
        
        .setting-switch {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            cursor: pointer;
        }
        
        .setting-switch input {
            display: none;
        }
        
        .slider {
            width: 40px;
            height: 20px;
            background: var(--bg-dark);
            border: 1px solid var(--border-color);
            border-radius: 10px;
            position: relative;
            transition: all 0.3s ease;
        }
        
        .slider::before {
            content: '';
            position: absolute;
            width: 16px;
            height: 16px;
            background: var(--text-secondary);
            border-radius: 50%;
            top: 1px;
            left: 1px;
            transition: all 0.3s ease;
        }
        
        .setting-switch input:checked + .slider {
            background: var(--primary);
        }
        
        .setting-switch input:checked + .slider::before {
            transform: translateX(20px);
            background: white;
        }
        
        .modal-footer {
            padding: 1.5rem;
            border-top: 1px solid var(--border-color);
            display: flex;
            justify-content: flex-end;
            gap: 1rem;
        }
        
        .btn-modal {
            padding: 0.5rem 1.5rem;
            border: none;
            border-radius: 8px;
            background: var(--bg-card);
            color: var(--text-primary);
            cursor: pointer;
            transition: all 0.3s ease;
            font-family: 'Inter', sans-serif;
            font-weight: 500;
        }
        
        .btn-modal:hover {
            transform: translateY(-2px);
            box-shadow: var(--glow-primary);
        }
        
        .btn-modal.primary {
            background: var(--primary);
            color: var(--bg-dark);
        }
        
        .shortcuts-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 0.8rem;
        }
        
        .shortcut-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.8rem;
            background: var(--bg-card);
            border-radius: 8px;
        }
        
        .shortcut-key {
            background: var(--bg-dark);
            color: var(--primary);
            padding: 0.3rem 0.6rem;
            border-radius: 4px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.9rem;
        }
        
        .shortcut-desc {
            color: var(--text-secondary);
            font-size: 0.9rem;
        }
        
        .alert-item {
            display: flex;
            gap: 1rem;
            padding: 1rem;
            background: var(--bg-card);
            border-radius: 8px;
            margin-bottom: 1rem;
            border-left: 4px solid;
        }
        
        .alert-icon {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.1);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
        }
        
        .alert-content {
            flex: 1;
        }
        
        .alert-title {
            font-weight: 600;
            margin-bottom: 0.3rem;
            color: var(--text-primary);
        }
        
        .alert-desc {
            font-size: 0.9rem;
            color: var(--text-secondary);
            margin-bottom: 0.3rem;
        }
        
        .alert-time {
            font-size: 0.8rem;
            color: var(--text-muted);
        }
        
        .paused {
            background: var(--warning) !important;
        }
    `;
    document.head.appendChild(modalStyles);
    
    // Console greeting
    console.log('%c🚀 OPENCLAW MISSION CONTROL v3.0 🚀', 'color: #00ff9d; font-size: 20px; font-weight: bold;');
    console.log('%cSystem initialized. All agents online.', 'color: #00b8ff; font-size: 14px;');
    console.log('%cType Ctrl+/ for keyboard shortcuts', 'color: #ff00aa; font-size: 12px;');
    console.log('%cReady for mission control operations!', 'color: #00ff9d; font-size: 12px;');
}

// Export for global access
window.initMissionControl = initMissionControl;