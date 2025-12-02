# Explore Data with AI

You can now connect the Data Portal's MCP Server to your favourite AI chatbot and explore the Lincolnshire open data using natural language.

## Setup Instructions

MCP Server URL: https://mcp.portaljs.com/@lcc/sse

### Setup Instructions (Any MCP-Compatible Client)

Different AI apps expose MCP setup in different places, but the required fields are the same. Look for something like “MCP Servers”, “Model Context Protocol”, or “Connectors” in your client’s settings.

Add a new MCP server with:

- Name: Lincolnshire Open Data
- URL: https://mcp.portaljs.com/@lcc/sse
- (Optional) Transport / Type: SSE (Server-Sent Events)

Save/enable the connection. Once active, your AI client can call PortalJS tools.

## How to Use

Once connected, you can interact with the data portal using natural language. The AI will automatically use the appropriate tools based on your requests.

### Search for Datasets

Find datasets by describing what you're looking for:

**Example prompts:**

- Search for datasets about CO2 emissions
- Find data on housing prices
- Look for climate change datasets
- Show me datasets related to population statistics

The search will return a list of matching datasets with their titles, descriptions, and IDs.

### Fetch Dataset Details

Get detailed information about a specific dataset:

**Example prompts:**

- Show me details of house-prices dataset
- Show me information about the CO2 emissions dataset

The fetch tool returns complete dataset metadata including:

- Title and description
- Organization
- Resources (files) with formats and download URLs
- Tags and creation dates
- License information

### Preview Dataset

View the actual data from a resource in table format. Once you found the dataset, you can request to display a preview of a data resource.

**The preview displays:**

- Data formatted as a markdown table
- Download link to the full resource
- Number of records available
- Source information (DataStore or direct CSV/JSON)

> [NOTE]
> *You can specify the number of rows (default: 10, max: 100):*
> - "Preview 50 rows of this dataset"
> - "Show me the first 15 records"

## Complete Workflow Example

Here's a typical conversation flow:

> You: "Search for datasets about house prices"

> AI: [Returns list of housing datasets]

> You: "Fetch details for the first one"

> AI: [Shows complete dataset information with resources]

> You: "Preview the CSV resource"

> AI: [Displays data table with download link]

## Available Tools

The MCP server provides three main tools:

1. **search** - Search datasets by keywords
2. **get** - Get detailed dataset information
3. **preview_data_table** - View data in table format with download links
