# Quality Control Spreadsheet App

## Overview
The Quality Control Spreadsheet App is a Google Apps Script application designed to streamline Quality Control (QC) data entry and reporting within Google Sheets. It automates repetitive administrative tasks and transforms raw QC data into structured, readable summaries.

## Features

### Automated Sheet Creation
Generate new QC sheets directly from a custom UI menu. Each new sheet is automatically duplicated from a standardized master template and renamed appropriately.

### Centralized Data Consolidation
Aggregates QC data from multiple sheets into a single, unified dataset.

### Automated Reporting & Visualization
Formats and organizes consolidated QC data into a clean, digestible summary sheet for easy review and analysis.

## How It Works

The application is built around a centralized **QC Master Sheet**, which serves as the standardized template for daily data entry.

1. Users create a new QC sheet via the custom menu.
2. The app duplicates the master template and prepares it for daily input.
3. When reporting is needed, users select the visualization option from the same menu.
4. The script consolidates all relevant QC data and generates a formatted summary sheet.
