class DataManager {
    constructor() {
        this.baseUrl = '/api'; // Para quando tiver backend
        this.useLocalStorage = true; // Usar localStorage enquanto não tem backend
        this.dataFiles = {
            freelancers: 'freelancers.json',
            companies: 'companies.json',
            opportunities: 'opportunities.json',
            applications: 'applications.json',
            users: 'users.json',
            messages: 'messages.json'
        };
    }

    // ==================== MÉTODOS GERAIS ====================
    
    // Salvar dados em um arquivo JSON
    async saveToFile(filename, data) {
        if (this.useLocalStorage) {
            localStorage.setItem(filename, JSON.stringify(data));
            return { success: true, message: `Dados salvos em ${filename}` };
        }
        
        // Para quando tiver backend real
        try {
            const response = await fetch(`${this.baseUrl}/${filename}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            return await response.json();
        } catch (error) {
            console.error('Erro ao salvar:', error);
            return { success: false, error: error.message };
        }
    }

    // Carregar dados de um arquivo JSON
    async loadFromFile(filename, defaultValue = []) {
        if (this.useLocalStorage) {
            const data = localStorage.getItem(filename);
            return data ? JSON.parse(data) : defaultValue;
        }
        
        try {
            const response = await fetch(`${this.baseUrl}/${filename}`);
            return await response.json();
        } catch (error) {
            console.error('Erro ao carregar:', error);
            return defaultValue;
        }
    }

    // Exportar todos os dados para JSON
    async exportAllData() {
        const allData = {};
        for (const [key, filename] of Object.entries(this.dataFiles)) {
            allData[key] = await this.loadFromFile(filename, []);
        }
        
        const dataStr = JSON.stringify(allData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `quebragalho_backup_${new Date().toISOString()}.json`;
        link.click();
        URL.revokeObjectURL(url);
        
        return allData;
    }

    // Importar dados de um arquivo JSON
    async importData(jsonFile) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = async (e) => {
                try {
                    const data = JSON.parse(e.target.result);
                    for (const [key, value] of Object.entries(data)) {
                        const filename = this.dataFiles[key];
                        if (filename) {
                            await this.saveToFile(filename, value);
                        }
                    }
                    resolve({ success: true, message: 'Dados importados com sucesso!' });
                } catch (error) {
                    reject({ success: false, error: error.message });
                }
            };
            reader.onerror = () => reject({ success: false, error: 'Erro ao ler arquivo' });
            reader.readAsText(jsonFile);
        });
    }

    // ==================== FREELANCERS ====================
    
    async getFreelancers() {
        return await this.loadFromFile(this.dataFiles.freelancers, []);
    }
    
    async getFreelancerById(id) {
        const freelancers = await this.getFreelancers();
        return freelancers.find(f => f.id === id);
    }
    
    async saveFreelancer(freelancerData) {
        const freelancers = await this.getFreelancers();
        const index = freelancers.findIndex(f => f.id === freelancerData.id);
        
        if (index !== -1) {
            freelancers[index] = freelancerData;
        } else {
            freelancerData.id = freelancerData.id || `freelancer_${Date.now()}`;
            freelancerData.createdAt = new Date().toISOString();
            freelancers.push(freelancerData);
        }
        
        freelancerData.updatedAt = new Date().toISOString();
        await this.saveToFile(this.dataFiles.freelancers, freelancers);
        return freelancerData;
    }
    
    async deleteFreelancer(id) {
        const freelancers = await this.getFreelancers();
        const filtered = freelancers.filter(f => f.id !== id);
        await this.saveToFile(this.dataFiles.freelancers, filtered);
        return { success: true };
    }

    // ==================== EMPRESAS ====================
    
    async getCompanies() {
        return await this.loadFromFile(this.dataFiles.companies, []);
    }
    
    async getCompanyById(id) {
        const companies = await this.getCompanies();
        return companies.find(c => c.id === id);
    }
    
    async saveCompany(companyData) {
        const companies = await this.getCompanies();
        const index = companies.findIndex(c => c.id === companyData.id);
        
        if (index !== -1) {
            companies[index] = companyData;
        } else {
            companyData.id = companyData.id || `company_${Date.now()}`;
            companyData.createdAt = new Date().toISOString();
            companies.push(companyData);
        }
        
        companyData.updatedAt = new Date().toISOString();
        await this.saveToFile(this.dataFiles.companies, companies);
        return companyData;
    }
    
    async deleteCompany(id) {
        const companies = await this.getCompanies();
        const filtered = companies.filter(c => c.id !== id);
        await this.saveToFile(this.dataFiles.companies, filtered);
        return { success: true };
    }

    // ==================== OPORTUNIDADES ====================
    
    async getOpportunities() {
        return await this.loadFromFile(this.dataFiles.opportunities, []);
    }
    
    async getOpportunitiesByUser(userId, userType) {
        const opportunities = await this.getOpportunities();
        return opportunities.filter(o => o.postedById === userId && o.postedByType === userType);
    }
    
    async getOpenOpportunities() {
        const opportunities = await this.getOpportunities();
        return opportunities.filter(o => o.status === 'open');
    }
    
    async saveOpportunity(opportunityData) {
        const opportunities = await this.getOpportunities();
        const index = opportunities.findIndex(o => o.id === opportunityData.id);
        
        if (index !== -1) {
            opportunities[index] = opportunityData;
        } else {
            opportunityData.id = opportunityData.id || `opp_${Date.now()}`;
            opportunityData.createdAt = new Date().toISOString();
            opportunityData.applications = opportunityData.applications || [];
            opportunities.unshift(opportunityData);
        }
        
        opportunityData.updatedAt = new Date().toISOString();
        await this.saveToFile(this.dataFiles.opportunities, opportunities);
        return opportunityData;
    }
    
    async deleteOpportunity(id) {
        const opportunities = await this.getOpportunities();
        const filtered = opportunities.filter(o => o.id !== id);
        await this.saveToFile(this.dataFiles.opportunities, filtered);
        return { success: true };
    }
    
    async updateOpportunityStatus(id, status) {
        const opportunities = await this.getOpportunities();
        const opportunity = opportunities.find(o => o.id === id);
        if (opportunity) {
            opportunity.status = status;
            opportunity.updatedAt = new Date().toISOString();
            await this.saveToFile(this.dataFiles.opportunities, opportunities);
        }
        return opportunity;
    }

    // ==================== CANDIDATURAS ====================
    
    async getApplications() {
        return await this.loadFromFile(this.dataFiles.applications, []);
    }
    
    async getApplicationsByOpportunity(opportunityId) {
        const applications = await this.getApplications();
        return applications.filter(a => a.opportunityId === opportunityId);
    }
    
    async getApplicationsByUser(userId) {
        const applications = await this.getApplications();
        return applications.filter(a => a.userId === userId);
    }
    
    async saveApplication(applicationData) {
        const applications = await this.getApplications();
        const existingIndex = applications.findIndex(a => a.id === applicationData.id);
        
        if (existingIndex !== -1) {
            applications[existingIndex] = applicationData;
        } else {
            applicationData.id = applicationData.id || `app_${Date.now()}`;
            applicationData.createdAt = new Date().toISOString();
            applications.push(applicationData);
        }
        
        applicationData.updatedAt = new Date().toISOString();
        await this.saveToFile(this.dataFiles.applications, applications);
        
        // Atualizar também a oportunidade
        const opportunities = await this.getOpportunities();
        const opportunity = opportunities.find(o => o.id === applicationData.opportunityId);
        if (opportunity) {
            if (!opportunity.applications) opportunity.applications = [];
            if (!opportunity.applications.find(a => a.userId === applicationData.userId)) {
                opportunity.applications.push({
                    userId: applicationData.userId,
                    userName: applicationData.userName,
                    message: applicationData.message,
                    value: applicationData.value,
                    date: applicationData.createdAt
                });
                await this.saveToFile(this.dataFiles.opportunities, opportunities);
            }
        }
        
        return applicationData;
    }

    // ==================== USUÁRIOS ====================
    
    async getUsers() {
        return await this.loadFromFile(this.dataFiles.users, []);
    }
    
    async getUserByEmail(email) {
        const users = await this.getUsers();
        return users.find(u => u.email === email);
    }
    
    async saveUser(userData) {
        const users = await this.getUsers();
        const index = users.findIndex(u => u.id === userData.id);
        
        if (index !== -1) {
            users[index] = userData;
        } else {
            userData.id = userData.id || `user_${Date.now()}`;
            userData.createdAt = new Date().toISOString();
            users.push(userData);
        }
        
        userData.updatedAt = new Date().toISOString();
        await this.saveToFile(this.dataFiles.users, users);
        return userData;
    }

    // ==================== MENSAGENS ====================
    
    async getMessages() {
        return await this.loadFromFile(this.dataFiles.messages, []);
    }
    
    async getMessagesBetweenUsers(user1Id, user2Id) {
        const messages = await this.getMessages();
        return messages.filter(m => 
            (m.fromId === user1Id && m.toId === user2Id) ||
            (m.fromId === user2Id && m.toId === user1Id)
        ).sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }
    
    async saveMessage(messageData) {
        const messages = await this.getMessages();
        messageData.id = messageData.id || `msg_${Date.now()}`;
        messageData.createdAt = new Date().toISOString();
        messages.push(messageData);
        await this.saveToFile(this.dataFiles.messages, messages);
        return messageData;
    }
}

// Instância global
const dataManager = new DataManager();

// Exportar para uso
if (typeof module !== 'undefined' && module.exports) {
    module.exports = dataManager;
}