import express from 'express';
import cors from 'cors';
import authRoutes from './modules/auth/auth.routes'; 
import eleveRoutes from './modules/eleve/eleve.routes';
import anneeAcademRoutes from './modules/anneeAcademique/anneeAcademique.routes';
import classeRoutes from './modules/classe/classe.routes';
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/eleve', eleveRoutes);
app.use('/api/anneeAcademique', anneeAcademRoutes);
app.use('/api/classe', classeRoutes);

export default app;
