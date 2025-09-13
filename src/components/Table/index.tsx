"use client"

import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
// import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
// import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { ReactNode, useMemo } from 'react';
// import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import {
    ModuleRegistry,
    ClientSideRowModelModule,
} from 'ag-grid-community';

ModuleRegistry.registerModules([
    ClientSideRowModelModule,
]);

interface IMobileConfig {
    logo?: {
        value?: string;
        renderer?: (data: any) => ReactNode
    };
    topLeft?: {
        field?: string;
        renderer?: (data: any) => ReactNode
    };
    topRight?: {
        field?: string;
        renderer?: (data: any) => ReactNode
    };
    bottomLeft?: {
        field?: string;
        renderer?: (data: any) => ReactNode
    };
    bottomRight?: {
        field?: string;
        renderer?: (data: any) => ReactNode
    };
    more?: {
        field?: string;
        renderer?: (data: any) => ReactNode,
        clickHandler?: (data: any) => void
    }
}

interface IProps {
    data: Array<Record<string, string | number | boolean>>
    header: Array<Record<'field', string>>
    rowClickHandler?: (args: any) => void
    isRowSelectable?: any
    onSelectionChanged?: any
    fitStrategy?: 'fitCellContents' | 'fitGridWidth',
    mobileConfig?: IMobileConfig
}

const Table = ({ data, header, rowClickHandler, isRowSelectable, onSelectionChanged, fitStrategy, mobileConfig }: IProps) => {
    const columnTypes = useMemo(() => {
        return {
            actions: {
                width: 100,
                cellStyle: {
                    overflow: "visible"
                },
            },
        };
    }, []);
    return (
        <>
            <div className={`ag-theme-quartz w-full h-full ${mobileConfig && "hidden lg:block"}`}>
                <AgGridReact
                    rowData={data}
                    columnDefs={header}
                    onRowClicked={(params) => { rowClickHandler && rowClickHandler(params.data) }}
                    autoSizeStrategy={{
                        type: fitStrategy || 'fitCellContents'
                    }}
                    // rowClass={"cursor-pointer !p-3 !bg-red-500"}
                    rowSelection={"multiple"}
                    suppressColumnVirtualisation={true}
                    // @ts-ignore
                    onSelectionChanged={onSelectionChanged}
                    columnTypes={columnTypes}
                    headerHeight={40}
                    rowHeight={40}
                />
            </div>
            {
                mobileConfig && (
                    <div className='!w-full max-w-[95vw] h-[65vh] overflow-x-scroll flex flex-col items-start justify-start lg:hidden '>
                        {
                            data.map((itm, index) => (
                                <MobileCard data={itm} key={index} mobileConfig={mobileConfig} />
                            ))
                        }
                    </div>
                )
            }
        </>
    )
};

export default Table;

const MobileCard = (props: any) => {
    const { mobileConfig } = props;
    return (
        <div className='w-full  min-h-[80px] min-w-[100%] px-3 py-2 rounded-sm shadow-sm drop-shadow-md mb-5 cursor-auto flex flex-row justify-between flex-wrap items-center whitespace-nowrap text-nowrap'>
            {
                mobileConfig?.logo && (
                    <div className='w-[45px] h-[45px] rounded-full mr-2'>
                        {
                            mobileConfig?.logo?.renderer ? mobileConfig?.logo?.renderer() : <img src={mobileConfig?.logo?.value} alt="" />
                        }
                    </div>
                )
            }
            <div className='flex flex-col justify-center h-full flex-1'>
                <div className='flex flex-row justify-between w-full flex-wrap'>
                    <RenderCardPart
                        name="topLeft"
                        data={props.data}
                        config={mobileConfig?.topLeft}
                    />
                    <RenderCardPart
                        name="topRight"
                        data={props.data}
                        config={mobileConfig?.topRight}
                    />
                </div>
                <div className='flex flex-row justify-between w-full flex-wrap'>
                    <RenderCardPart
                        name="bottomLeft"
                        data={props.data}
                        config={mobileConfig?.bottomLeft}
                    />
                    <RenderCardPart
                        name="bottomRight"
                        data={props.data}
                        config={mobileConfig?.bottomRight}
                    />
                </div>
            </div>
            {
                mobileConfig?.more?.clickHandler && (
                    <svg onClick={() => mobileConfig?.more?.clickHandler(props.data)} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.375 3.75L11.625 9L6.375 14.25" stroke="#222222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                )
            }
        </div>
    )
}
interface IRenderCardPart {
    name: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
    data: any,
    config: {
        field: string;
        renderer: (data: any) => ReactNode
    }
}
const RenderCardPart = (props: IRenderCardPart) => {
    const config = props.config;
    if (!props.config) {
        return null;
    }
    return (
        <div>
            <div className={`${props.name}`}>
                {config?.renderer ? config.renderer(props.data) : props.data[config?.field]}
            </div>
        </div>
    )
}