import React, { useState } from "react";
import {Button, Card, Col, Row, Table} from "antd";

function TabelaDestaque(props) {
    // const [data, setData] = useState();
    const data = [{
        artigo: 'teste',
    },
    {
        artigo:'vasco',
    }
]
    const columns =[
        {
            title:'Artigo',
            key: 'artigo',
            dataIndex:'artigo',
        }
    ]

    return(
        <Card>
            <Table size="small"
                dataSource={data}
                columns={columns}
                bordered/>
        </Card>
    )
}

export default TabelaDestaque;