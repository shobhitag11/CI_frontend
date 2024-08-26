import React, { useState, useEffect } from 'react';

const contractData = [
  { id: 1, type: 'Service Agreement', parties: ['ABC Corp', 'XYZ Tech'], keyObligations: 'Provide IT support and maintenance', tenure: '2 years', summary: 'IT services contract for software development and support', startDate: '2023-07-01', endDate: '2025-06-30' },
  { id: 2, type: 'Lease Agreement', parties: ['123 Properties', 'Tech Startup Inc'], keyObligations: 'Monthly rent payment, maintain premises', tenure: '5 years', summary: 'Office space lease in downtown tech hub', startDate: '2023-08-01', endDate: '2028-07-31' },
  { id: 3, type: 'Employment Contract', parties: ['Global Corp', 'John Doe'], keyObligations: 'Full-time work, confidentiality', tenure: 'Permanent', summary: 'Senior developer position with stock options', startDate: '2023-09-01', endDate: 'N/A' },
  { id: 4, type: 'Vendor Agreement', parties: ['MegaRetail', 'SupplyChain Co'], keyObligations: 'Supply inventory, maintain quality standards', tenure: '3 years', summary: 'Exclusive supplier for retail chain', startDate: '2023-10-01', endDate: '2026-09-30' },
  { id: 5, type: 'Licensing Agreement', parties: ['InnovaTech', 'GadgetMaker Inc'], keyObligations: 'Royalty payments, quality control', tenure: '10 years', summary: 'Patent licensing for smart home technology', startDate: '2023-11-01', endDate: '2033-10-31' },
];

const InteractiveGraph = ({ data, onNodeClick }) => {
  const width = 800;
  const height = 600;

  const contractNodes = data.map((contract, index) => ({
    x: 150 + (index * 150) % 600,
    y: 100 + Math.floor(index / 4) * 150,
    type: 'contract',
    id: contract.id,
    name: contract.type
  }));

  const partyNodes = Array.from(new Set(data.flatMap(contract => contract.parties)))
    .map((party, index) => ({
      x: 100 + (index * 200) % 700,
      y: 500,
      type: 'party',
      name: party
    }));

  const links = data.flatMap(contract =>
    contract.parties.map(party => ({
      source: contractNodes.find(node => node.id === contract.id),
      target: partyNodes.find(node => node.name === party)
    }))
  );

  return (
    <svg width={width} height={height}>
      {links.map((link, index) => (
        <line
          key={index}
          x1={link.source.x}
          y1={link.source.y}
          x2={link.target.x}
          y2={link.target.y}
          stroke="#999"
          strokeWidth="1"
        />
      ))}
      {contractNodes.concat(partyNodes).map((node, index) => (
        <g key={index} onClick={() => onNodeClick(node)} className="cursor-pointer">
          <circle
            cx={node.x}
            cy={node.y}
            r={40}
            fill={node.type === 'contract' ? '#4299e1' : '#48bb78'}
          />
          <text
            x={node.x}
            y={node.y}
            textAnchor="middle"
            dy=".3em"
            fill="white"
            fontSize="12"
          >
            {node.name.length > 15 ? node.name.substring(0, 12) + '...' : node.name}
          </text>
        </g>
      ))}
    </svg>
  );
};

const SimpleKnowledgeGraph = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredContracts, setFilteredContracts] = useState(contractData);
  const [selectedNode, setSelectedNode] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [newContract, setNewContract] = useState({ type: '', parties: '', keyObligations: '', tenure: '', summary: '', startDate: '', endDate: '' });
  const [contracts, setContracts] = useState(contractData);

  useEffect(() => {
    handleSearch();
  }, [searchTerm, startDate, endDate]);

  const handleSearch = () => {
    const filtered = contracts.filter(contract =>
      (contract.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.parties.some(party => party.toLowerCase().includes(searchTerm.toLowerCase())) ||
      contract.summary.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!startDate || contract.startDate >= startDate) &&
      (!endDate || contract.endDate <= endDate)
    );
    setFilteredContracts(filtered);
  };

  const handleNodeClick = (node) => {
    setSelectedNode(node);
  };

  const handleAddContract = (e) => {
    e.preventDefault();
    const newId = Math.max(...contracts.map(c => c.id)) + 1;
    const contractToAdd = { ...newContract, id: newId, parties: newContract.parties.split(',').map(p => p.trim()) };
    setContracts([...contracts, contractToAdd]);
    setNewContract({ type: '', parties: '', keyObligations: '', tenure: '', summary: '', startDate: '', endDate: '' });
  };

  const handleExport = () => {
    const csvContent = [
      ['ID', 'Type', 'Parties', 'Key Obligations', 'Tenure', 'Summary', 'Start Date', 'End Date'],
      ...filteredContracts.map(contract => [
        contract.id,
        contract.type,
        contract.parties.join('; '),
        contract.keyObligations,
        contract.tenure,
        contract.summary,
        contract.startDate,
        contract.endDate
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'contract_data.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Contract Intelligence Dashboard</h1>
      
      <div className="mb-4 flex flex-wrap">
        <input
          type="text"
          placeholder="Search contracts"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 mr-2 mb-2"
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 mr-2 mb-2"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 mr-2 mb-2"
        />
        <button
          onClick={handleExport}
          className="bg-green-500 text-white px-4 py-2 rounded-md mb-2"
        >
          Export CSV
        </button>
      </div>

      <div className="mb-4 bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4" role="alert">
        <p className="font-bold">Interactive Knowledge Graph</p>
        <p>Click on nodes to view more details. Blue nodes represent contracts, green nodes represent parties.</p>
      </div>

      <div className="mb-4 border rounded-lg p-4">
        <h2 className="text-xl font-bold mb-2">Contract Relationships</h2>
        <InteractiveGraph data={filteredContracts} onNodeClick={handleNodeClick} />
      </div>

      {selectedNode && (
        <div className="mb-4 bg-gray-100 p-4 rounded-lg">
          <h3 className="font-bold">{selectedNode.type === 'contract' ? 'Contract Details' : 'Party Details'}</h3>
          <p>{selectedNode.type === 'contract' ? `Contract Type: ${selectedNode.name}` : `Party Name: ${selectedNode.name}`}</p>
          {selectedNode.type === 'contract' && (
            <p>
              {contracts.find(c => c.id === selectedNode.id).summary}
            </p>
          )}
        </div>
      )}

      <div className="mb-4">
        <h3 className="text-xl font-bold mb-2">Add New Contract</h3>
        <form onSubmit={handleAddContract} className="space-y-2">
          <input
            type="text"
            placeholder="Contract Type"
            value={newContract.type}
            onChange={(e) => setNewContract({...newContract, type: e.target.value})}
            className="border border-gray-300 rounded-md px-4 py-2 w-full"
          />
          <input
            type="text"
            placeholder="Parties (comma-separated)"
            value={newContract.parties}
            onChange={(e) => setNewContract({...newContract, parties: e.target.value})}
            className="border border-gray-300 rounded-md px-4 py-2 w-full"
          />
          <input
            type="text"
            placeholder="Key Obligations"
            value={newContract.keyObligations}
            onChange={(e) => setNewContract({...newContract, keyObligations: e.target.value})}
            className="border border-gray-300 rounded-md px-4 py-2 w-full"
          />
          <input
            type="text"
            placeholder="Tenure"
            value={newContract.tenure}
            onChange={(e) => setNewContract({...newContract, tenure: e.target.value})}
            className="border border-gray-300 rounded-md px-4 py-2 w-full"
          />
          <input
            type="text"
            placeholder="Summary"
            value={newContract.summary}
            onChange={(e) => setNewContract({...newContract, summary: e.target.value})}
            className="border border-gray-300 rounded-md px-4 py-2 w-full"
          />
          <input
            type="date"
            placeholder="Start Date"
            value={newContract.startDate}
            onChange={(e) => setNewContract({...newContract, startDate: e.target.value})}
            className="border border-gray-300 rounded-md px-4 py-2 w-full"
          />
          <input
            type="date"
            placeholder="End Date"
            value={newContract.endDate}
            onChange={(e) => setNewContract({...newContract, endDate: e.target.value})}
            className="border border-gray-300 rounded-md px-4 py-2 w-full"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Add Contract</button>
        </form>
      </div>

      <table className="min-w-full bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Type</th>
            <th className="py-2 px-4 border-b">Parties</th>
            <th className="py-2 px-4 border-b">Key Obligations</th>
            <th className="py-2 px-4 border-b">Tenure</th>
            <th className="py-2 px-4 border-b">Summary</th>
            <th className="py-2 px-4 border-b">Start Date</th>
            <th className="py-2 px-4 border-b">End Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredContracts.map((contract) => (
            <tr key={contract.id}>
              <td className="py-2 px-4 border-b">{contract.id}</td>
              <td className="py-2 px-4 border-b">{contract.type}</td>
              <td className="py-2 px-4 border-b">{contract.parties.join(', ')}</td>
              <td className="py-2 px-4 border-b">{contract.keyObligations}</td>
              <td className="py-2 px-4 border-b">{contract.tenure}</td>
              <td className="py-2 px-4 border-b">{contract.summary}</td>
              <td className="py-2 px-4 border-b">{contract.startDate}</td>
              <td className="py-2 px-4 border-b">{contract.endDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SimpleKnowledgeGraph;