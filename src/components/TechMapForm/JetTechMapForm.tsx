import { Autocomplete, Box, Button, IconButton, TextField, Tooltip } from '@mui/material';
import { Controller, FormProvider, useFieldArray, useForm } from 'react-hook-form';
import JetInput from '../common/form-components/JetInput';
import JetDatePicker from '../common/form-components/JetDatePicker';
import moment from 'moment';
import style from './JetTechMapForm.module.css'
import { IJetTechMapFormProps, TechMapFormValues } from './types';
import { useEffect, useState } from 'react';
import JetIcon from '../common/JetIcon';
import { guid } from '../../utils/utils';
import { IJobDependency } from '../../models/techmap';

const JetTechMapForm: React.FC<IJetTechMapFormProps> = ({ onSaveForm, defaultValue, isEdit }) => {

    const [dependencies, setDependencies] = useState<IJobDependency[]>([]);

    const methods = useForm<TechMapFormValues>({
        defaultValues: {
            name: '',
            jobs: [{id: guid(), jobName: '', jobDescription: '', jobDuration: '', jobDependence: [], jobResources: '', jobCompleteDate: '' }]
        }
    })

    const { control, handleSubmit, reset,setValue } = methods

    const { fields, append, remove } = useFieldArray({
        name: 'jobs',
        control: control,
        keyName: '_id'
    })

    const addJob = () => {
        append({id: guid(), jobName: '', jobDescription: '', jobDuration: '', jobDependence: [], jobResources: '', jobCompleteDate: '' })
    }

    useEffect(() => {
        console.log(`${defaultValue?.jobs[0].jobName} - ${defaultValue?.jobs[0].jobCompleteDate}`)
        if (isEdit && defaultValue) reset(defaultValue)
    }, [isEdit, reset, defaultValue, setValue])

    useEffect(() => {
        if(fields.length > 0) {
            const deps: IJobDependency[] = fields.filter(field => field.jobName != '').map(field => {
                return {
                    id: field.id,
                    title: field.jobName
                }
            })
            setDependencies(deps);
        }
    }, [fields])

    return (
        <Box className={style.root}>
            <Box className={style.techMapForm}>
                <FormProvider {...methods}>
                    <Box className={style.techMapFormTitle}>{(isEdit) ? defaultValue?.name : 'Новая технологическая карта'}</Box>
                    <JetInput name={`name`} label={'Название карты'} placeholder={'Название карты'} fullWidth sx={{ mt: 1 }} />
                    {fields.map((job, index) => (
                        <Box className={style.job} key={job.id}>
                            <Box className={style.jobHeader}>
                                <Box className={style.jobNumber}>Работа № {index + 1}</Box>
                                <Tooltip title="Удалить работу">
                                    <IconButton onClick={() => remove(index)} color='primary' size='large'>
                                        <JetIcon icon='jet-trash' />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                            <Box className={style.jobFields}>
                                <JetInput name={`jobs[${index}].jobName`} label={'Название'} placeholder={'Название'} />
                                <JetInput name={`jobs[${index}].jobDescription`} label={'Описание'} placeholder={'Описание'} />
                                <JetInput name={`jobs[${index}].jobDuration`} label={'Длительность (ч)'} placeholder={'Длительность (ч)'} />
                                <JetInput name={`jobs[${index}].jobResources`} label={'Ресурсы'} placeholder={'Ресурсы'} />
                                <JetDatePicker
                                    name={`jobs[${index}].jobCompleteDate`}
                                    label='Дата окончания'
                                    format='DD.MM.YYYY'
                                    initialValue={(job && job.jobCompleteDate) ? moment(job.jobCompleteDate) : moment()}
                                />

                                {dependencies.length > 0 && <Controller
                                    render={({ field: { onChange, value } }) => (
                                        <Autocomplete
                                            multiple
                                            options={dependencies}
                                            value={value || null}
                                            getOptionLabel={(option) => option?.title}
                                            onChange={(event, value) => {
                                                onChange(value);
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    variant="standard"
                                                    label="Зависит от"
                                                    placeholder="Зависит от"
                                                />
                                            )}
                                        />
                                    )}
                                    name={`jobs.${index}.jobDependence`}
                                    control={control}
                                />}
                            </Box>
                        </Box>
                    ))}
                </FormProvider>
            </Box>
            <Box className={style.btnsGroup}>
                <Button variant="contained" color='info' onClick={addJob}>Добавить работу</Button>
                <Button variant="contained" onClick={handleSubmit(onSaveForm)}>Сохранить</Button>
            </Box>
        </Box>
    )
}

export default JetTechMapForm