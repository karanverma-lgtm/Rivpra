"use client";

import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

interface Product {
  name: string;
  composition: string;
  strength: string;
  form: string;
}

interface Category {
  id: string;
  name: string;
  icon: string;
  desc: string;
  products: Product[];
}

const productData: Category[] = [
  {
    id: "nephrology",
    name: "Nephrology & Transplant",
    icon: "nephrology",
    desc: "Comprehensive portfolio of advanced formulations for renal care, dialysis support, and immunosuppressive therapy post-transplantation.",
    products: [
      { name: "Alpha Ketoanalogue", composition: "Essential Amino Acids & Calcium salts", strength: "Single Strength, Double Strength", form: "Tablet / Sachet / Suspension" },
      { name: "Azathioprine", composition: "Azathioprine IP", strength: "50mg / 100mg", form: "Tablet" },
      { name: "Apremilast", composition: "Apremilast", strength: "10mg / 20mg / 30mg", form: "Tablet" },
      { name: "Calcium Acetate", composition: "Calcium Acetate USP", strength: "667mg / 1334mg", form: "Tablet" },
      { name: "Calcium / Sodium Polystyrene Sulphonate", composition: "Polystyrene Sulphonate", strength: "15g", form: "Sachet / Suspension" },
      { name: "Cinacalcet Hydrochloride", composition: "Cinacalcet HCl", strength: "30mg", form: "Tablet" },
      { name: "Cyclosporine", composition: "Cyclosporine USP", strength: "25mg / 50mg / 100mg, 100mg/ml", form: "Soft Gel Capsule / Oral Solution" },
      { name: "Deflazacort", composition: "Deflazacort", strength: "6mg / 12mg / 18mg / 24mg / 30mg", form: "Tablet / Suspension" },
      { name: "Everolimus", composition: "Everolimus", strength: "0.25mg / 0.5mg / 0.75mg / 2.5mg / 5mg", form: "Tablet" },
      { name: "Mycophenolate Mofetil", composition: "Mycophenolate Mofetil USP", strength: "250mg / 500mg / 750mg / 1000mg, 1g/5ml", form: "Tablet / Oral Suspension" },
      { name: "Mycophenolic Acid", composition: "Mycophenolic Acid (as Sodium salt)", strength: "180mg / 360mg / 540mg / 720mg", form: "Delayed-Release Tablet" },
      { name: "Sevelamer Carbonate", composition: "Sevelamer Carbonate", strength: "400mg / 800mg", form: "Tablet / Suspension" },
      { name: "Sirolimus", composition: "Sirolimus", strength: "1mg", form: "Tablet" },
      { name: "Tacrolimus", composition: "Tacrolimus USP", strength: "0.25mg / 0.5mg / 0.75mg / 1mg / 2mg / 3mg / 5mg", form: "Capsule / Tablet / Oral Solution" },
      { name: "Valganciclovir Hydrochloride", composition: "Valganciclovir HCl", strength: "450mg", form: "Tablet" },
      { name: "Fosfomycin Trometamol", composition: "Fosfomycin Trometamol", strength: "3g", form: "Sachet" },
    ],
  },
  {
    id: "cardiovascular",
    name: "Cardiovascular System",
    icon: "cardiovascular",
    desc: "Broad range of cardio-protective molecules for managing hypertension, hyperlipidemia, angina, and ischemic heart diseases.",
    products: [
      { name: "Amlodipine", composition: "Amlodipine Besylate BP", strength: "2.5mg / 5mg / 10mg", form: "Tablet" },
      { name: "Amlodipine & Atenolol", composition: "Amlodipine + Atenolol", strength: "2.5mg+25mg / 5mg+50mg", form: "Tablet" },
      { name: "Aspirin & Clopidogrel", composition: "Aspirin + Clopidogrel Bisulphate", strength: "75mg+75mg / 150mg+75mg", form: "Tablet" },
      { name: "Aspirin & Rosuvastatin", composition: "Aspirin + Rosuvastatin Calcium", strength: "75mg+10mg / 75mg+20mg / 150mg+20mg", form: "Capsule" },
      { name: "Atorvastatin & Fenofibrate", composition: "Atorvastatin + Fenofibrate", strength: "10mg+145mg / 10mg+160mg", form: "Tablet" },
      { name: "Atorvastatin, Aspirin & Clopidogrel", composition: "Atorvastatin + Aspirin + Clopidogrel", strength: "10mg+75mg+75mg / 20mg+75mg+75mg", form: "Capsule" },
      { name: "Benidipine Hydrochloride", composition: "Benidipine HCl", strength: "4mg / 8mg", form: "Tablet" },
      { name: "Cilnidipine", composition: "Cilnidipine", strength: "5mg / 10mg / 20mg", form: "Tablet" },
      { name: "Clonidine Hydrochloride", composition: "Clonidine HCl", strength: "100mcg / 150mcg", form: "Tablet" },
      { name: "Labetalol Hydrochloride", composition: "Labetalol HCl", strength: "50mg / 100mg / 200mg", form: "Tablet" },
      { name: "Metoprolol Succinate", composition: "Metoprolol Succinate ER", strength: "25mg / 50mg", form: "Tablet" },
      { name: "Nifedipine", composition: "Nifedipine Retard", strength: "30mg / 60mg", form: "Tablet" },
      { name: "Rosuvastatin", composition: "Rosuvastatin Calcium", strength: "5mg / 10mg / 20mg / 40mg", form: "Tablet" },
      { name: "Telmisartan & Amlodipine", composition: "Telmisartan + Amlodipine", strength: "40mg+5mg / 80mg+5mg", form: "Tablet" },
      { name: "Telmisartan & Chlorthalidone", composition: "Telmisartan + Chlorthalidone", strength: "40mg+6.25mg / 40mg+12.5mg", form: "Tablet" },
      { name: "Telmisartan & Hydrochlorothiazide", composition: "Telmisartan + Hydrochlorothiazide", strength: "40mg+12.5mg", form: "Tablet" },
    ],
  },
  {
    id: "diabetology",
    name: "Diabetology & Joint Care",
    icon: "diabetology",
    desc: "Modern oral hypoglycemic agents and anti-rheumatic solutions to manage diabetes mellitus and osteoarticular disorders.",
    products: [
      { name: "Dapagliflozin", composition: "Dapagliflozin Propanediol", strength: "5mg / 10mg", form: "Tablet" },
      { name: "Dapagliflozin & Metformin", composition: "Dapagliflozin + Metformin HCl ER", strength: "5mg+500mg / 10mg+1000mg", form: "Tablet" },
      { name: "Gliclazide & Metformin", composition: "Gliclazide + Metformin HCl", strength: "40mg+500mg / 80mg+500mg", form: "Tablet" },
      { name: "Glimepiride & Metformin", composition: "Glimepiride + Metformin HCl ER", strength: "1mg+500mg / 2mg+500mg / 2mg+1000mg", form: "Tablet" },
      { name: "Glimepiride, Pioglitazone & Metformin", composition: "Glimepiride + Pioglitazone + Metformin HCl ER", strength: "1mg+15mg+500mg / 2mg+15mg+500mg", form: "Tablet" },
      { name: "Pioglitazone", composition: "Pioglitazone HCl", strength: "15mg / 30mg", form: "Tablet" },
      { name: "Sitagliptin", composition: "Sitagliptin Phosphate", strength: "25mg / 50mg / 100mg", form: "Tablet" },
      { name: "Sitagliptin & Metformin", composition: "Sitagliptin + Metformin HCl", strength: "50mg+500mg / 50mg+1000mg", form: "Tablet" },
      { name: "Teneligliptin & Metformin", composition: "Teneligliptin Hydrobromide + Metformin HCl", strength: "20mg+500mg / 20mg+1000mg", form: "Tablet" },
      { name: "Vildagliptin & Metformin", composition: "Vildagliptin + Metformin HCl", strength: "50mg+500mg / 50mg+1000mg / 50mg+850mg", form: "Tablet" },
      { name: "Voglibose", composition: "Voglibose", strength: "0.2mg / 0.3mg", form: "Tablet" },
      { name: "Leflunomide", composition: "Leflunomide", strength: "10mg / 20mg / 100mg", form: "Tablet" },
      { name: "Tofacitinib", composition: "Tofacitinib Citrate", strength: "5mg / 11mg ER", form: "Tablet" },
      { name: "Sulfasalazine", composition: "Sulfasalazine Gastro-resistant", strength: "500mg / 1000mg", form: "Tablet" },
      { name: "Febuxostat", composition: "Febuxostat", strength: "40mg / 80mg", form: "Tablet" },
    ],
  },
  {
    id: "neurology",
    name: "Neurology & Psychiatry",
    icon: "neurology",
    desc: "Targeted neurotherapeutics, anticonvulsants, cognitive enhancers, and psychiatric medications for CNS disorders.",
    products: [
      { name: "Levetiracetam", composition: "Levetiracetam IP", strength: "250mg / 500mg / 750mg / 1000mg", form: "Tablet" },
      { name: "Citicoline & Piracetam", composition: "Citicoline Sodium + Piracetam", strength: "500mg+400mg / 500mg+800mg", form: "Tablet" },
      { name: "Citicoline", composition: "Citicoline Sodium IP", strength: "250mg / 500mg", form: "Tablet" },
      { name: "Divalproex Sodium", composition: "Divalproex Sodium ER", strength: "250mg / 500mg / 750mg / 1000mg", form: "Tablet" },
      { name: "Duloxetine", composition: "Duloxetine HCl", strength: "20mg / 30mg / 40mg / 60mg", form: "Capsule / Tablet" },
      { name: "Escitalopram", composition: "Escitalopram Oxalate", strength: "5mg / 10mg / 20mg", form: "Tablet" },
      { name: "Flunarizine Dihydrochloride", composition: "Flunarizine Dihydrochloride", strength: "5mg / 10mg", form: "Tablet" },
      { name: "Fluvoxamine Maleate", composition: "Fuvoxamine Maleate", strength: "25mg / 50mg / 100mg", form: "Tablet" },
      { name: "Gabapentin", composition: "Gabapentin USP", strength: "300mg / 400mg / 600mg", form: "Tablet / Capsule" },
      { name: "Lithium Carbonate", composition: "Lithium Carbonate SR", strength: "300mg / 400mg", form: "Tablet" },
      { name: "Olanzapine & Fluoxetine", composition: "Olanzapine + Fluoxetine HCl", strength: "5mg+20mg", form: "Tablet" },
      { name: "Pregabalin & Methylcobalamin", composition: "Pregabalin + Methylcobalamin", strength: "75mg+500mcg / 75mg+750mcg", form: "Capsule" },
      { name: "Pregabalin", composition: "Pregabalin IP", strength: "25mg / 50mg / 75mg / 150mg / 300mg", form: "Capsule" },
      { name: "Risperidone & Trihexyphenidyl", composition: "Risperidone + Trihexyphenidyl HCl", strength: "2mg+2mg / 3mg+2mg", form: "Tablet" },
      { name: "Venlafaxine Hydrochloride", composition: "Venlafaxine HCl ER", strength: "37.5mg / 75mg / 150mg", form: "Capsule" },
      { name: "Levodopa, Carbidopa & Entacapone", composition: "Levodopa + Carbidopa + Entacapone", strength: "50mg+12.5mg+200mg / 100mg+25mg+200mg", form: "Tablet" },
    ],
  },
  {
    id: "gastroenterology",
    name: "Gastroenterology & GI",
    icon: "gastroenterology",
    desc: "Acid reducers, anti-ulcerants, anti-emetics, bowel regulators, and mucosal protective agents for digestive health.",
    products: [
      { name: "Esomeprazole Magnesium", composition: "Esomeprazole Magnesium Trihydrate", strength: "20mg / 40mg", form: "Tablet / Capsule" },
      { name: "Esomeprazole & Levosulpiride", composition: "Esomeprazole + Levosulpiride SR", strength: "40mg+75mg", form: "Capsule" },
      { name: "Esomeprazole & Domperidone", composition: "Esomeprazole + Domperidone SR", strength: "40mg+30mg", form: "Capsule" },
      { name: "Lactulose", composition: "Lactulose Solution USP", strength: "10g/15ml / 3.35g/5ml", form: "Oral Solution" },
      { name: "Liquid Paraffin, Milk of Magnesia & Sodium Picosulfate", composition: "Paraffin + Milk of Magnesia + Picosulfate", strength: "Liquid base", form: "Suspension" },
      { name: "Magaldrate & Simethicone", composition: "Magaldrate + Simethicone", strength: "480mg+20mg / 5ml", form: "Suspension" },
      { name: "Magaldrate, Simethicone & Oxetacaine", composition: "Magaldrate + Simethicone + Oxetacaine", strength: "Magaldrate base + Oxetacaine 10mg", form: "Suspension / Tablet" },
      { name: "Omeprazole & Domperidone", composition: "Omeprazole + Domperidone", strength: "20mg+10mg / 20mg+30mg", form: "Capsule" },
      { name: "Ondansetron", composition: "Ondansetron HCl", strength: "2mg/ml, 4mg / 8mg", form: "Oral Solution / Mouth Dissolving Tablet" },
      { name: "Pantoprazole Sodium & Domperidone", composition: "Pantoprazole + Domperidone SR", strength: "40mg+30mg", form: "Capsule / Tablet" },
      { name: "Pantoprazole Sodium & Levosulpiride", composition: "Pantoprazole + Levosulpiride SR", strength: "40mg+75mg", form: "Capsule" },
      { name: "Rabeprazole Sodium", composition: "Rabeprazole Sodium", strength: "20mg", form: "Tablet" },
      { name: "Rabeprazole & Domperidone", composition: "Rabeprazole + Domperidone SR", strength: "20mg+30mg", form: "Capsule" },
      { name: "Sucralfate & Oxetacaine", composition: "Sucralfate + Oxetacaine", strength: "1g+10mg / 10ml", form: "Suspension" },
      { name: "Simethicone & N-Acetylcysteine", composition: "Simethicone + N-Acetyl-L-Cysteine", strength: "150mg+600mg / 5ml", form: "Oral Emulsion" },
    ],
  },
  {
    id: "dermatology",
    name: "Dermatology & Cosmetics",
    icon: "dermatology",
    desc: "Advanced dermatological creams, antifungal ointments, and premium cosmetic formulations for comprehensive skin care.",
    products: [
      { name: "Adapalene & Clindamycin Gel", composition: "Adapalene + Clindamycin Phosphate", strength: "0.1% w/w + 1% w/w", form: "Gel" },
      { name: "Beclomethasone Dipropionate", composition: "Beclomethasone Dipropionate", strength: "0.025% w/w", form: "Lotion / Cream" },
      { name: "Ciclopirox Olamine", composition: "Ciclopirox Olamine USP", strength: "1% w/w", form: "Cream" },
      { name: "Clobetasol Propionate & Salicylic Acid", composition: "Clobetasol + Salicylic Acid", strength: "0.05% + 3% w/w", form: "Ointment" },
      { name: "Desonide Cream / Lotion", composition: "Desonide USP", strength: "0.05% w/w", form: "Cream / Lotion" },
      { name: "Eberconazole & Mometasone Furoate", composition: "Eberconazole + Mometasone Furoate", strength: "1% + 0.1% w/w", form: "Cream" },
      { name: "Fluocinolone, Hydroquinone & Tretinoin", composition: "Fluocinolone Acetonide + Hydroquinone + Tretinoin", strength: "0.01%+2%+0.025%", form: "Cream" },
      { name: "Fusidic Acid Cream", composition: "Fusidic Acid BP", strength: "2% w/w", form: "Cream" },
      { name: "Ketoconazole & Zinc Pyrithione", composition: "Ketoconazole + ZPTO", strength: "2% + 1% w/v", form: "Shampoo / Medicated Lotion" },
      { name: "Luliconazole Cream", composition: "Luliconazole", strength: "1% w/w", form: "Cream" },
      { name: "Mupirocin Ointment", composition: "Mupirocin USP", strength: "2% w/w", form: "Ointment" },
      { name: "Permethrin Cream", composition: "Permethrin", strength: "5% w/w", form: "Cream / Lotion" },
      { name: "Sertaconazole Nitrate", composition: "Sertaconazole Nitrate", strength: "2% w/w", form: "Cream" },
      { name: "Tacrolimus Ointment", composition: "Tacrolimus", strength: "0.03% / 0.1% w/w", form: "Ointment" },
      { name: "Sun Screen Gel/Cream", composition: "Octocrylene + Avobenzone + Zinc oxide + Niacinamide", strength: "SPF 50 / SPF 30", form: "Gel / Cream" },
      { name: "Aloevera Moisturising Cream", composition: "Aloevera Juice + Vitamin E + Sesame Oil", strength: "Moisturising Base", form: "Cream / Lotion" },
    ],
  },
  {
    id: "urology",
    name: "Urology & Nephrocare",
    icon: "urology",
    desc: "Formulations for benign prostatic hyperplasia (BPH), overactive bladder (OAB), and systemic renal-urinary health.",
    products: [
      { name: "Tamsulosin & Deflazacort", composition: "Tamsulosin HCl (PR) + Deflazacort", strength: "0.4mg + 6mg", form: "Capsule" },
      { name: "Tamsulosin Hydrochloride", composition: "Tamsulosin HCl Prolonged-Release", strength: "0.4mg", form: "Capsule / Tablet" },
      { name: "Tamsulosin & Dutasteride", composition: "Tamsulosin + Dutasteride", strength: "0.4mg + 0.5mg", form: "Tablet / Capsule" },
      { name: "Mirabegron", composition: "Mirabegron Extended-Release", strength: "25mg / 50mg", form: "Tablet" },
      { name: "Febuxostat", composition: "Febuxostat", strength: "40mg / 80mg", form: "Tablet" },
      { name: "Potassium Chloride", composition: "Potassium Chloride", strength: "1g / 5ml", form: "Oral Solution" },
      { name: "Solifenacin Succinate", composition: "Solifenacin Succinate", strength: "5mg / 10mg", form: "Tablet" },
      { name: "Tolterodine Tartrate", composition: "Tolterodine Tartrate ER", strength: "2mg / 4mg", form: "Capsule" },
    ],
  },
  {
    id: "antibiotics",
    name: "Antibiotics & Antivirals",
    icon: "antibiotics",
    desc: "High-grade antibacterial, antimicrobial, antifungal, and antiviral formulations to fight a broad spectrum of infections.",
    products: [
      { name: "Azithromycin", composition: "Azithromycin USP", strength: "250mg / 500mg, 200mg/5ml", form: "Tablet / Suspension" },
      { name: "Ciprofloxacin & Tinidazole", composition: "Ciprofloxacin + Tinidazole", strength: "500mg+600mg", form: "Tablet" },
      { name: "Clarithromycin", composition: "Clarithromycin USP", strength: "250mg / 500mg", form: "Tablet / Dry Syrup" },
      { name: "Clindamycin", composition: "Clindamycin Phosphate", strength: "150mg / 300mg", form: "Capsule" },
      { name: "Doxycycline & Lactic Acid Bacillus", composition: "Doxycycline + LAB", strength: "100mg + 5 Billion Spores", form: "Capsule" },
      { name: "Favipiravir", composition: "Favipiravir", strength: "200mg / 400mg / 800mg", form: "Tablet" },
      { name: "Fluconazole", composition: "Fluconazole USP", strength: "50mg / 150mg / 200mg", form: "Tablet / Capsule" },
      { name: "Faropenem Sodium", composition: "Faropenem Sodium", strength: "200mg / 300mg ER", form: "Tablet" },
      { name: "Linezolid", composition: "Linezolid", strength: "600mg", form: "Tablet" },
      { name: "Ofloxacin & Ornidazole", composition: "Ofloxacin + Ornidazole", strength: "200mg+500mg, 50mg+125mg/5ml", form: "Tablet / Suspension" },
      { name: "Rifaximin", composition: "Rifaximin BP", strength: "200mg / 400mg / 550mg", form: "Tablet" },
      { name: "Amoxycillin & Potassium Clavulanate", composition: "Amoxycillin + Clavulanate Potassium", strength: "250mg+125mg / 500mg+125mg / 875mg+125mg", form: "Tablet / Dry Syrup" },
      { name: "Flucloxacillin", composition: "Flucloxacillin Sodium", strength: "250mg / 500mg", form: "Capsule" },
    ],
  },
  {
    id: "analgesics",
    name: "Analgesics, NSAIDs & Enzymes",
    icon: "analgesics",
    desc: "Pain management formulas, anti-inflammatory agents, and systemic enzyme therapies for acute and chronic conditions.",
    products: [
      { name: "Aceclofenac", composition: "Aceclofenac IP", strength: "100mg / 200mg SR", form: "Tablet" },
      { name: "Aceclofenac & Paracetamol", composition: "Aceclofenac + Paracetamol", strength: "100mg + 325mg", form: "Tablet" },
      { name: "Aceclofenac, Paracetamol & Serratiopeptidase", composition: "Aceclofenac + Paracetamol + Serratiopeptidase", strength: "100mg+325mg+15mg", form: "Tablet" },
      { name: "Aceclofenac, Paracetamol & Thiocolchicoside", composition: "Aceclofenac + Paracetamol + Thiocolchicoside", strength: "100mg+325mg+4mg / 8mg", form: "Tablet" },
      { name: "Diclofenac Diethylamine Gel", composition: "Diclofenac + Linseed Oil + Methyl Salicylate + Menthol", strength: "Standard Gel base", form: "External Gel" },
      { name: "Diclofenac Potassium & Paracetamol", composition: "Diclofenac Potassium + Paracetamol", strength: "50mg+325mg", form: "Tablet" },
      { name: "Drotaverine & Aceclofenac", composition: "Drotaverine HCl + Aceclofenac", strength: "80mg+100mg", form: "Tablet" },
      { name: "Etoricoxib & Thiocolchicoside", composition: "Etoricoxib + Thiocolchicoside", strength: "60mg+4mg / 90mg+4mg", form: "Tablet" },
      { name: "Mefenamic Acid & Paracetamol", composition: "Mefenamic Acid + Paracetamol", strength: "100mg+250mg / 5ml, 500mg+325mg", form: "Suspension / Tablet" },
      { name: "Trypsin & Chymotrypsin", composition: "Trypsin-Chymotrypsin IP", strength: "50,000 / 100,000 Armour Units", form: "Tablet" },
      { name: "Trypsin, Bromelain, Rutoside & Diclofenac", composition: "Trypsin + Bromelain + Rutoside + Diclofenac", strength: "48mg+90mg+100mg+50mg", form: "Tablet" },
      { name: "Serratiopeptidase", composition: "Serratiopeptidase", strength: "10mg / 20mg", form: "Tablet" },
    ],
  },
  {
    id: "nutraceuticals",
    name: "Nutraceuticals & Vitamins",
    icon: "nutraceuticals",
    desc: "Dietary supplements, high-potency multivitamins, antioxidant complexes, and therapeutic iron/calcium preparations.",
    products: [
      { name: "Carbonyl Iron, Folic Acid & Zinc", composition: "Carbonyl Iron + Folic Acid + Zinc Sulphate", strength: "50mg+0.5mg+61.8mg", form: "Capsule" },
      { name: "Ferrous Ascorbate & Folic Acid", composition: "Ferrous Ascorbate + Folic Acid", strength: "100mg+1.5mg, 30mg+550mcg/5ml", form: "Tablet / Suspension" },
      { name: "Ferrous Ascorbate, L-Methylfolate & Pyridoxal-5-phosphate", composition: "Ferrous Ascorbate + L-Methylfolate + Pyridoxal-5-phosphate", strength: "Sustained-Release matrix", form: "Tablet" },
      { name: "Ferric Pyrophosphate (Liposomal)", composition: "Liposomal Iron + Vitamin C + Vitamin B12 + Folic Acid", strength: "30mg+50mg+0.75mcg+155mcg", form: "Tablet" },
      { name: "Alpha Lipoic Acid & Methylcobalamin", composition: "ALA + Methylcobalamin + Pyridoxine + Folic Acid + D3", strength: "100mg+1500mcg+1.5mg+3mg+1000IU", form: "Tablet / Capsule" },
      { name: "Cholecalciferol Drops / Capsules", composition: "Vitamin D3 (Cholecalciferol)", strength: "400IU/ml, 60,000IU", form: "Drops / Soft Gel Capsule" },
      { name: "L-Arginine & Proanthocyanidin", composition: "L-Arginine + Proanthocyanidin", strength: "3g+75mg", form: "Granules / Sachet" },
      { name: "L-Glutathione & Vitamin C", composition: "L-Glutathione + Vitamin C", strength: "500mg+500mg", form: "Sachet" },
      { name: "Prebiotic & Probiotic", composition: "Lactobacillus + Bifidobacterium + Saccharomyces + FOS", strength: "5 Billion / 15 Billion / 30 Billion Spores", form: "Capsule / Sachet / Dry Syrup" },
      { name: "Ubiquinol Acetate & Taurine", composition: "Ubiquinol + Taurine", strength: "30mg+500mg", form: "Capsule" },
      { name: "Vitamin C & Zinc", composition: "Ascorbic Acid + Zinc Sulphate", strength: "500mg + 5mg / 1000mg + 20mg", form: "Chewable / Effervescent Tablet" },
    ],
  },
];

function TherapeuticIcon({ id }: { id: string }) {
  switch (id) {
    case "nephrology":
      return (
        <svg viewBox="0 0 100 100" className="w-10 h-10 drop-shadow-md">
          <defs>
            <linearGradient id="nephGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#0369a1" />
            </linearGradient>
            <radialGradient id="nephHighlight" cx="35%" cy="30%" r="60%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
              <stop offset="60%" stopColor="#0ea5e9" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
            </radialGradient>
          </defs>
          <path d="M42 25C30 25 24 38 24 53C24 68 34 77 44 73C49 70 47 58 47 53C47 48 49 36 44 29C43 27 43 25 42 25Z" fill="url(#nephGrad)" />
          <path d="M42 25C30 25 24 38 24 53C24 68 34 77 44 73C49 70 47 58 47 53C47 48 49 36 44 29C43 27 43 25 42 25Z" fill="url(#nephHighlight)" />
          <path d="M58 25C70 25 76 38 76 53C76 68 66 77 56 73C51 70 53 58 53 53C53 48 51 36 56 29C57 27 57 25 58 25Z" fill="url(#nephGrad)" />
          <path d="M58 25C70 25 76 38 76 53C76 68 66 77 56 73C51 70 53 58 53 53C53 48 51 36 56 29C57 27 57 25 58 25Z" fill="url(#nephHighlight)" />
        </svg>
      );
    case "cardiovascular":
      return (
        <svg viewBox="0 0 100 100" className="w-10 h-10 drop-shadow-md">
          <defs>
            <linearGradient id="cardioGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#991b1b" />
            </linearGradient>
            <radialGradient id="cardioHighlight" cx="30%" cy="30%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#ef4444" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
            </radialGradient>
          </defs>
          <path d="M50 82C50 82 20 60 20 38C20 22 32 14 44 20C47 22 50 26 50 26C50 26 53 22 56 20C68 14 80 22 80 38C80 60 50 82 50 82Z" fill="url(#cardioGrad)" />
          <path d="M50 82C50 82 20 60 20 38C20 22 32 14 44 20C47 22 50 26 50 26C50 26 53 22 56 20C68 14 80 22 80 38C80 60 50 82 50 82Z" fill="url(#cardioHighlight)" />
        </svg>
      );
    case "diabetology":
      return (
        <svg viewBox="0 0 100 100" className="w-10 h-10 drop-shadow-md">
          <defs>
            <linearGradient id="diabGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#dc2626" />
              <stop offset="100%" stopColor="#7f1d1d" />
            </linearGradient>
            <radialGradient id="diabHighlight" cx="35%" cy="40%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#dc2626" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f6b11b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
          </defs>
          <path d="M50 18C50 18 24 45 24 64C24 78 36 86 50 86C64 86 76 78 76 64C76 45 50 18 50 18Z" fill="url(#diabGrad)" />
          <path d="M50 18C50 18 24 45 24 64C24 78 36 86 50 86C64 86 76 78 76 64C76 45 50 18 50 18Z" fill="url(#diabHighlight)" />
          <ellipse cx="50" cy="65" rx="38" ry="12" fill="none" stroke="url(#ringGrad)" strokeWidth="5" transform="rotate(-15 50 65)" strokeDasharray="180 60" />
        </svg>
      );
    case "neurology":
      return (
        <svg viewBox="0 0 100 100" className="w-10 h-10 drop-shadow-md">
          <defs>
            <radialGradient id="neuroCenter" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="70%" stopColor="#6b21a8" />
              <stop offset="100%" stopColor="#3b0764" />
            </radialGradient>
            <radialGradient id="nodeLight" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
            </radialGradient>
          </defs>
          <path d="M50 50 L20 30 M50 50 L80 30 M50 50 L50 85 M50 50 L15 65 M50 50 L85 65" stroke="#a855f7" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
          <circle cx="50" cy="50" r="18" fill="url(#neuroCenter)" />
          <circle cx="50" cy="50" r="18" fill="url(#nodeLight)" />
          <circle cx="20" cy="30" r="7" fill="url(#neuroCenter)" />
          <circle cx="20" cy="30" r="7" fill="url(#nodeLight)" />
          <circle cx="80" cy="30" r="7" fill="url(#neuroCenter)" />
          <circle cx="80" cy="30" r="7" fill="url(#nodeLight)" />
          <circle cx="50" cy="85" r="7" fill="url(#neuroCenter)" />
          <circle cx="50" cy="85" r="7" fill="url(#nodeLight)" />
        </svg>
      );
    case "gastroenterology":
      return (
        <svg viewBox="0 0 100 100" className="w-10 h-10 drop-shadow-md">
          <defs>
            <linearGradient id="gastroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#a16207" />
            </linearGradient>
            <radialGradient id="gastroHighlight" cx="35%" cy="30%" r="60%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#eab308" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="50" cy="50" r="36" fill="url(#gastroGrad)" />
          <circle cx="50" cy="50" r="36" fill="url(#gastroHighlight)" />
          <path d="M42 35 C42 35 34 42 34 50 C34 60 42 66 52 66 C62 66 68 56 68 50 C68 44 64 38 60 38 C56 38 52 42 50 44 C48 42 46 35 42 35 Z" fill="#ffffff" opacity="0.85" />
        </svg>
      );
    case "dermatology":
      return (
        <svg viewBox="0 0 100 100" className="w-10 h-10 drop-shadow-md">
          <defs>
            <linearGradient id="dermGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
            <radialGradient id="dermHighlight" cx="35%" cy="30%" r="60%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </radialGradient>
          </defs>
          <path d="M50 18 C46 18, 44 24, 44 28 L56 28 C56 24, 54 18, 50 18 Z" fill="#ef4444" />
          <rect x="42" y="28" width="16" height="6" rx="2" fill="#d1d5db" />
          <path d="M36 36 C36 34, 38 34, 40 34 L60 34 C62 34, 64 34, 64 36 L64 74 C64 78, 60 82, 56 82 L44 82 C40 82, 36 78, 36 74 Z" fill="url(#dermGrad)" />
          <path d="M36 36 C36 34, 38 34, 40 34 L60 34 C62 34, 64 34, 64 36 L64 74 C64 78, 60 82, 56 82 L44 82 C40 82, 36 78, 36 74 Z" fill="url(#dermHighlight)" />
          <rect x="42" y="48" width="16" height="20" rx="1" fill="#ffffff" opacity="0.9" />
        </svg>
      );
    case "urology":
      return (
        <svg viewBox="0 0 100 100" className="w-10 h-10 drop-shadow-md">
          <defs>
            <linearGradient id="uroGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
            <linearGradient id="uroGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e0f2fe" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
          </defs>
          <path d="M50 16 L50 84 C66 84, 76 74, 76 58 C76 40, 50 16, 50 16 Z" fill="url(#uroGrad1)" />
          <path d="M50 16 L50 84 C34 84, 24 74, 24 58 C24 40, 50 16, 50 16 Z" fill="url(#uroGrad2)" />
        </svg>
      );
    case "antibiotics":
      return (
        <svg viewBox="0 0 100 100" className="w-10 h-10 drop-shadow-md" transform="rotate(-30)">
          <defs>
            <linearGradient id="pillBlue" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
            <linearGradient id="pillWhite" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </linearGradient>
          </defs>
          <path d="M25 50 C25 36, 36 25, 50 25 L50 75 C36 75, 25 64, 25 50 Z" fill="url(#pillBlue)" />
          <path d="M75 50 C75 36, 64 25, 50 25 L50 75 C64 75, 75 64, 75 50 Z" fill="url(#pillWhite)" />
          <line x1="50" y1="24" x2="50" y2="76" stroke="#0f172a" strokeWidth="2" opacity="0.1" />
          <rect x="30" y="30" width="40" height="8" rx="4" fill="#ffffff" opacity="0.3" />
        </svg>
      );
    case "analgesics":
      return (
        <svg viewBox="0 0 100 100" className="w-10 h-10 drop-shadow-md">
          <defs>
            <linearGradient id="analgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>
            <radialGradient id="analgHighlight" cx="35%" cy="30%" r="60%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
            </radialGradient>
          </defs>
          <path d="M50 16 L78 28 L78 56 C78 72, 64 82, 50 86 C36 82, 22 72, 22 56 L22 28 Z" fill="url(#analgGrad)" />
          <path d="M50 16 L78 28 L78 56 C78 72, 64 82, 50 86 C36 82, 22 72, 22 56 L22 28 Z" fill="url(#analgHighlight)" />
          <path d="M54 30 L38 52 L48 52 L42 72 L62 46 L50 46 Z" fill="#ffffff" opacity="0.9" />
        </svg>
      );
    case "nutraceuticals":
      return (
        <svg viewBox="0 0 100 100" className="w-10 h-10 drop-shadow-md">
          <defs>
            <linearGradient id="nutraGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#15803d" />
            </linearGradient>
            <radialGradient id="nutraHighlight" cx="35%" cy="30%" r="60%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="50" cy="50" r="36" fill="url(#nutraGrad)" />
          <circle cx="50" cy="50" r="36" fill="url(#nutraHighlight)" />
          <path d="M42 58 C42 42, 50 34, 62 34 C62 50, 54 58, 42 58 Z" fill="#ffffff" opacity="0.8" />
          <path d="M38 58 C38 48, 44 42, 52 42 C52 52, 48 58, 38 58 Z" fill="#ffffff" opacity="0.6" />
        </svg>
      );
    default:
      return <FallbackIcon />;
  }
}

function FallbackIcon() {
  return (
    <svg viewBox="0 0 100 100" className="w-10 h-10 drop-shadow-md inline-block align-middle">
      <defs>
        <linearGradient id="failGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="36" fill="url(#failGrad)" />
      <text x="50" y="60" textAnchor="middle" fill="#ffffff" fontSize="32" fontWeight="bold">?</text>
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg viewBox="0 0 100 100" className="w-5 h-5 flex-shrink-0 drop-shadow-sm text-amber-500 inline-block align-middle">
      <defs>
        <linearGradient id="warnGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>
      <path d="M50 12 L90 80 C92 84, 88 88, 83 88 L17 88 C12 88, 8 84, 10 80 L50 12 Z" fill="url(#warnGrad)" />
      <rect x="47" y="42" width="6" height="22" rx="3" fill="#ffffff" />
      <circle cx="50" cy="74" r="4.5" fill="#ffffff" />
    </svg>
  );
}

export default function TherapeuticAreas() {
  const [activeTab, setActiveTab] = useState<string>("nephrology");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);

  const activeCategory = useMemo(() => {
    return productData.find((cat) => cat.id === activeTab) || productData[0];
  }, [activeTab]);

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return activeCategory.products;
    return activeCategory.products.filter(
      (prod) =>
        prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.composition.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.form.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [activeCategory, searchQuery]);

  const toggleExpand = (prodName: string) => {
    if (expandedProduct === prodName) {
      setExpandedProduct(null);
    } else {
      setExpandedProduct(prodName);
    }
  };

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="products" className="relative w-full bg-slate-50 py-12">
      {/* Glow blobs */}
      <div className="absolute right-0 top-0 w-96 h-96 bg-[#1fb8e5]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute left-0 bottom-0 w-96 h-96 bg-[#f6b11b]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={ref} className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block px-3 py-1 rounded-full border border-[#1fb8e5]/40 bg-[#1fb8e5]/10 text-[#f6b11b] text-xs font-semibold tracking-widest uppercase mb-4"
          >
            Product Portfolio
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl lg:text-5xl font-black text-slate-950 tracking-tight"
          >
            Therapeutic{" "}
            <span className="text-transparent bg-gradient-to-r from-[#1fb8e5] to-[#f6b11b] bg-clip-text">
              Divisions
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-slate-600 text-base font-light"
          >
            Explore our certified range of pharmaceutical formulations covering hundreds of essential molecules.
          </motion.p>
        </div>

        {/* Tab & Content layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Tabs - left side */}
          <div className="lg:col-span-4 space-y-2 overflow-x-auto lg:overflow-visible flex lg:flex-col pb-4 lg:pb-0 scrollbar-none gap-2 lg:gap-0">
            {productData.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveTab(cat.id);
                  setSearchQuery("");
                  setExpandedProduct(null);
                }}
                className={`relative flex items-center gap-4 w-full text-left px-5 py-4 rounded-xl border text-sm font-semibold transition-all duration-300 whitespace-nowrap lg:whitespace-normal group ${
                  activeTab === cat.id
                    ? "bg-[#1fb8e5] border-[#1fb8e5] text-white shadow-md shadow-[#1fb8e5]/10"
                    : "bg-white border-slate-200 text-slate-700 hover:border-[#1fb8e5]/30 hover:bg-slate-50"
                }`}
              >
                {/* Active tab background slider (Framer Motion) */}
                {activeTab === cat.id && (
                  <motion.div
                    layoutId="activeTabBg"
                    className="absolute inset-0 bg-[#1fb8e5] rounded-xl -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                
                {/* 3D Animated Icon */}
                <motion.div
                  className="relative flex-shrink-0"
                  style={{ perspective: 400 }}
                  whileHover={{ 
                    rotateY: 20, 
                    rotateX: -10, 
                    scale: 1.15,
                    z: 30 
                  }}
                  animate={{
                    y: [0, -4, 0],
                    rotateZ: [0, 2, -2, 0]
                  }}
                  transition={{
                    y: {
                      duration: 3 + (cat.id.length % 3),
                      repeat: Infinity,
                      ease: "easeInOut"
                    },
                    rotateZ: {
                      duration: 4 + (cat.id.length % 4),
                      repeat: Infinity,
                      ease: "easeInOut"
                    },
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }}
                >
                  <TherapeuticIcon id={cat.id} />
                </motion.div>

                <span className="flex-1">{cat.name}</span>
                <span
                  className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                    activeTab === cat.id
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 text-slate-500 group-hover:bg-[#1fb8e5]/10 group-hover:text-[#1fb8e5]"
                  }`}
                >
                  {cat.products.length}
                </span>
              </button>
            ))}
          </div>

          {/* Content - right side */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 lg:p-8 shadow-sm">
            <div className="border-b border-slate-100 pb-6 mb-6">
              <h3 className="text-2xl font-extrabold text-slate-950 flex items-center gap-4">
                <motion.div
                  animate={{ y: [0, -6, 0], rotateY: [0, 360] }}
                  transition={{ 
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                    rotateY: { duration: 15, repeat: Infinity, ease: "linear" } 
                  }}
                  className="flex-shrink-0 w-12 h-12"
                >
                  <TherapeuticIcon id={activeCategory.id} />
                </motion.div>
                {activeCategory.name}
              </h3>
              <p className="text-slate-500 text-sm mt-2 font-light leading-relaxed">
                {activeCategory.desc}
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative mb-6">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search products by generic name or composition..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1fb8e5] focus:border-transparent transition-all"
              />
            </div>

            {/* Product Table (Expandable Rows) */}
            <div className="overflow-hidden border border-slate-100 rounded-xl">
              <div className="divide-y divide-slate-100 max-h-[500px] overflow-y-auto scrollbar-thin">
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-12 text-slate-400 text-sm">
                    No products found matching your search.
                  </div>
                ) : (
                  filteredProducts.map((prod) => {
                    const isExpanded = expandedProduct === prod.name;
                    return (
                      <div key={prod.name} className="transition-colors hover:bg-slate-50">
                        {/* Table Header Row */}
                        <div
                          onClick={() => toggleExpand(prod.name)}
                          className="flex items-center justify-between p-4 cursor-pointer select-none"
                        >
                          <div className="flex-1 pr-4">
                            <h4 className="text-slate-900 font-extrabold text-sm group-hover:text-[#1fb8e5]">
                              {prod.name}
                            </h4>
                            <p className="text-slate-500 text-xs mt-0.5 truncate max-w-[280px] sm:max-w-md font-light">
                              {prod.composition}
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="hidden sm:inline-block text-[10px] uppercase tracking-wider font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                              {prod.form}
                            </span>
                            <motion.span
                              animate={{ rotate: isExpanded ? 180 : 0 }}
                              className="text-slate-400"
                            >
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </motion.span>
                          </div>
                        </div>

                        {/* Expanded details (Framer Motion) */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="overflow-hidden bg-slate-50/50 px-4 pb-4 border-t border-slate-100/50"
                            >
                              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                                <div>
                                  <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">
                                    Composition
                                  </span>
                                  <span className="text-slate-700 font-medium">
                                    {prod.composition}
                                  </span>
                                </div>
                                <div>
                                  <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">
                                    Available Strengths
                                  </span>
                                  <span className="text-slate-700 font-medium">
                                    {prod.strength}
                                  </span>
                                </div>
                                <div className="sm:col-span-2">
                                  <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">
                                    Dosage Format
                                  </span>
                                  <span className="text-slate-700 font-medium">
                                    {prod.form}
                                  </span>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
            
            {/* Catalog disclaimer (from brochure pages) */}
            <div className="mt-6 p-4 rounded-xl bg-amber-50/50 border border-amber-100 text-[10px] sm:text-xs text-amber-800 leading-relaxed font-light flex gap-3 items-center">
              <WarningIcon />
              <p>
                <strong>Disclaimer:</strong> The displayed products are only manufactured by Rivpra formulations. The marketing of these products is the sole responsibility of the marketer only.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
