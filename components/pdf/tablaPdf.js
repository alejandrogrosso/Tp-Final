export default function ({ tableHead, tableData }) {
    let headHTML = `
    <tr>
    ${tableHead.map((t) => {
        return `<th>${t}</th>`
    }).join(" ")}
    </tr>
    `;

    let bodyHTML = tableData.map((rowData) => {
        return `<tr>
        ${rowData.map((r) => `<td>${r}</td>`).join(" ")}
        </tr>`
    }).join(" ");

    return `
        <style>
            .styled-table {
                border-collapse: collapse;
                margin: 40px 0;
                font-size: 0.9em;
                font-family: sans-serif;
                min-width: 400px;
                width:100%;
                box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
            }
            .styled-table thead tr {
                background-color: #009879;
                color: #ffffff;
                text-align: left;
            }
            .styled-table th,
            .styled-table td {
                padding: 12px 15px;
            }
            .styled-table tbody tr {
                border-bottom: 1px solid #dddddd;
            }

            .styled-table tbody tr:nth-of-type(even) {
                background-color: #f3f3f3;
            }

            .styled-table tbody tr:last-of-type {
                border-bottom: 2px solid #009879;
            }
            .styled-table tbody tr.active-row {
                font-weight: bold;
                color: #009879;
            }
        </style>
            <table class="styled-table">
            <thead>
                ${headHTML}
                </thead>
                <tbody>
                ${bodyHTML}
                </tbody>
            </table>
    `;
}