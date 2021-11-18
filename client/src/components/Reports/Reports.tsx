import React, { useEffect, useState } from 'react';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import CircularProgress from '@mui/material/CircularProgress';
import DownloadIcon from '@mui/icons-material/Download';
import { Chart } from 'react-google-charts';
// @ts-ignore
import * as html2pdf from 'html2pdf.js';

import { TaskItem } from '../Task/Task';

import { Wrapper, RadioGroupWrapper, ButtonWrapper, ButtonName, ChartWrapper } from './Reports.styles';
import { Loading } from '../TaskDetails/TaskDetails.styles';

interface ReportsProps {
    isLoaded: boolean,
    tasks: TaskItem[],
}

const Reports: React.FunctionComponent<ReportsProps> = ({ isLoaded, tasks }) => {
    const [data, setData] = useState<Array<(number | string | {})[]>>([]);
    const [options, setOptions] = useState({});

    const getReportByStatus = () => {
        const open = tasks.filter((task) => task.status === 'Open').length;
        const inProgress = tasks.filter((task) => task.status === 'In Progress').length;
        const done = tasks.filter((task) => task.status === 'Done').length;

        setOptions({
            title: 'Number of tasks by status',
            hAxis: {
                title: 'Number of tasks',
            },
            vAxis: {
                title: 'Task status',
            },
        });

        setData([
            ['Status', 'Number of tasks', { role: 'annotation' }],
            ['Open', open, open],
            ['In Progress', inProgress, inProgress],
            ['Done', done, done],
        ]);
    };

    const getReportByType = () => {
        const task = tasks.filter((task) => task.type === 'Task').length;
        const story = tasks.filter((task) => task.type === 'Story').length;
        const feature = tasks.filter((task) => task.type === 'Feature').length;
        const bug = tasks.filter((task) => task.type === 'Bug').length;

        setOptions({
            title: 'Number of tasks by type',
            hAxis: {
                title: 'Number of tasks',
            },
            vAxis: {
                title: 'Task type',
            },
        });

        setData([
            ['Type', 'Number of tasks', { role: 'annotation' }],
            ['Task', task, task],
            ['Story', story, story],
            ['Feature', feature, feature],
            ['Bug', bug, bug],
        ]);
    };

    const getReportByPriority = () => {
        const highest = tasks.filter((task) => task.priority === 'Highest').length;
        const high = tasks.filter((task) => task.priority === 'High').length;
        const normal = tasks.filter((task) => task.priority === 'Normal').length;
        const low = tasks.filter((task) => task.priority === 'Low').length;
        const lowest = tasks.filter((task) => task.priority === 'Lowest').length;

        setOptions({
            title: 'Number of tasks by priority',
            hAxis: {
                title: 'Number of tasks',
            },
            vAxis: {
                title: 'Task priority',
            },
        });

        setData([
            ['Priority', 'Number of tasks', { role: 'annotation' }],
            ['Highest', highest, highest],
            ['High', high, high],
            ['Normal', normal, normal],
            ['Low', low, low],
            ['Lowest', lowest, lowest],
        ]);
    };

    const getReportByAssignee = () => {
        const assigneeValues = [...new Set(tasks.map(task => task.assignee))];

        setOptions({
            title: 'Number of tasks by assignee',
            hAxis: {
                title: 'Number of tasks',
            },
            vAxis: {
                title: 'Task assignee',
            },
        });

        const dataArray: Array<(number | string | {})[]> = [];

        assigneeValues.forEach((assignee) => {
            const count = tasks.filter((task) => task.assignee === assignee).length;

            dataArray.push([assignee ? assignee : 'Unassigned', count, count]);
        });

        setData([
            ['Assignee', 'Number of tasks', { role: 'annotation' }],
            ...dataArray,
        ]);
    };

    const handleChangeRadioGroup = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
        switch (value) {
            case 'status': {
                getReportByStatus();
                break;
            }
            case 'type': {
                getReportByType();
                break;
            }
            case 'priority': {
                getReportByPriority();
                break;
            }
            case 'assignee': {
                getReportByAssignee();
                break;
            }
        }
    };

    const downloadReport = () => {
        const element = document.getElementById('chart')!;
        const elementToPdf = element.cloneNode(true) as HTMLElement;

        elementToPdf.style.marginLeft = '-10px';
        elementToPdf.style.marginRight = '0px';

        const opt = {
            filename:     'report.pdf',
            image:        { type: 'jpeg', quality: 1 },
            html2canvas:  { scale: 5 },
            jsPDF:        { orientation: 'portrait' }
        };

        html2pdf().set(opt).from(elementToPdf).save();
    };

    useEffect(() => {
        getReportByStatus();
    }, [tasks]);

    return (
        <Wrapper>
            <RadioGroupWrapper>
                <RadioGroup
                    defaultValue="status"
                    onChange={handleChangeRadioGroup}
                >
                    <FormControlLabel value="status" control={<Radio />} label="Status" />
                    <FormControlLabel value="type" control={<Radio />} label="Type" />
                    <FormControlLabel value="priority" control={<Radio />} label="Priority" />
                    <FormControlLabel value="assignee" control={<Radio />} label="Assignee" />
                </RadioGroup>
            </RadioGroupWrapper>
            {
                !isLoaded ? (
                    <Loading>
                        <CircularProgress size={100} />
                    </Loading>
                ) : (
                    <>
                        <ChartWrapper id="chart">
                            <Chart
                                width={'100%'}
                                height={'400px'}
                                chartType="BarChart"
                                data={data}
                                options={{
                                    ...options,
                                    titleTextStyle: {
                                        fontSize: 20,
                                    },
                                    hAxis: { minValue: 0 },
                                    legend: 'none',
                                }}
                            />
                        </ChartWrapper>
                        <ButtonWrapper>
                            <Button variant="outlined" color="primary" onClick={downloadReport}>
                                <ButtonName>Download report</ButtonName><DownloadIcon fontSize="small"/>
                            </Button>
                        </ButtonWrapper>
                    </>
                )
            }

        </Wrapper>
    );
};

export default Reports;
