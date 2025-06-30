import express from 'express';
import cors from 'cors';
import authRoutes from './modules/auth/auth.routes'; 
import eleveRoutes from './modules/eleve/eleve.routes';
import parentRoutes from './modules/parent/parent.routes';
import professeurRoutes from './modules/professeur/professeur.routes'
import anneeAcademRoutes from './modules/anneeAcademique/anneeAcademique.routes';
import classeRoutes from './modules/classe/classe.routes';
import matiereRoutes from './modules/matieres/matieres.routes'
import profMatiereRoutes from './modules/professeursMatieres/professeursMatieres.routes';
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/eleve', eleveRoutes);
app.use('/api/parent', parentRoutes);
app.use('/api/professeur', professeurRoutes);
app.use('/api/anneeAcademique', anneeAcademRoutes);
app.use('/api/classe', classeRoutes);
app.use('/api/matiere', matiereRoutes);
app.use('/api/professeur_matiere', profMatiereRoutes);

export default app;
