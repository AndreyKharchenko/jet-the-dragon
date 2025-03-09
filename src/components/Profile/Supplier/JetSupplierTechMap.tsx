import { Box, Fab } from '@mui/material'
import style from './JetSupplier.module.css';
import { createTechMap, deleteTechMap, getSupplierTechMaps, updateTechMap } from '../../../store/slices/userSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import JetTechMapTable from '../../TechMapTable/JetTechMapTable';
import { techMapColumns } from '../../TechMapTable/const/techMapColumns';
import JetTechMapCombobox from '../../TechMapCombobox/JetTechMapCombobox';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useMemo, useState } from 'react';
import JetDialog from '../../common/JetDialog';
import { TechMapFormValues } from '../../TechMapForm/types';
import JetTechMapForm from '../../TechMapForm/JetTechMapForm';
import * as userSelectors from '../../../store/selectors/userSelectors';
import { IJetTechMapComboboxOption } from '../../TechMapCombobox/types';
import { ICreateOrUpdateTechMap, IJobDependency, ITechMapJob, ITechMapTableRow } from '../../../models/techmap';
import JetIcon from '../../common/JetIcon';
import { guid } from '../../../utils/utils';
import JetSpinner from '../../common/JetSpinner';
import { flexCenter } from '../../../themes/commonStyles';

const JetSupplierTechMap = () => {
  const dispatch = useAppDispatch();
  let [openDialog, setOpenDialog] = useState<boolean>(false);
  let [isEdit, setIsEdit] = useState<boolean>(false);
  const supplierTechMaps = useAppSelector(userSelectors.supplierTechMaps);
  const supplierId = useAppSelector(userSelectors.supplierId);
  const getLoader = useAppSelector(userSelectors.loader);

  const hasData = !getLoader && supplierTechMaps && supplierTechMaps.length > 0

  const techMapsOptions = supplierTechMaps?.map(techmap => {
    return {
      label: techmap.name,
      id: techmap?.id || ''
    }
  }) || []

  const getDependantJobNames = (dependantIds: string[], jobs: ITechMapJob[]) => {
    // Фильтруем массив jobs по найденным id в dependense
    const dependentJobs = jobs.filter(job => dependantIds.includes(job.id));

    // Преобразовываем массив работ в массив их имен
    return dependentJobs.map(job => job.jobName);
  }

  const [currentTechMap, setCurrentTechMap] = useState<IJetTechMapComboboxOption | null>(techMapsOptions[0] || null)

  const currentTechMapData = supplierTechMaps?.find(techmap => techmap.id == currentTechMap?.id);

  const hasCriticalPath = currentTechMapData?.criticalPath && currentTechMapData.criticalPath.techMapJobs.length > 0

  const techMapTableRows: ITechMapTableRow[] = useMemo(() => {
    const techmap = supplierTechMaps?.find(techmap => techmap.id == currentTechMap?.id);
    return techmap?.techMapJobs.map(job => {
      return {
        ...job,
        jobDependence: getDependantJobNames(job.jobDependence, techmap.techMapJobs)
      }
    }) || []
  }, [currentTechMap])

  const currentTechMapFormData: (TechMapFormValues | null) = useMemo(() => {
    const techmap = supplierTechMaps?.find(techmap => techmap.id == currentTechMap?.id)
    // Таблица для поиска по старому ID имени и нового ID (требуется генерировать новый ID для обработки на беке)
    const jobMap = techmap?.techMapJobs.reduce((acc: { [key: string]: { jobName: string, newId: string } }, job) => {
      acc[job.id] = { jobName: job.jobName, newId: guid() };
      return acc;
    }, {});

    if (jobMap == undefined) {
      return null;
    }

    const formValues = {
      name: techmap?.name || '',
      jobs: techmap?.techMapJobs.map(job => {
        return {
          ...job,
          id: jobMap[job.id].newId,
          jobDependence: job.jobDependence.map(j => ({ id: jobMap[j].newId, title: jobMap[j].jobName })) as IJobDependency[]
        }
      }) || []
    }

    return formValues
  }, [currentTechMap])

  const onAddTechMap = () => {
    setIsEdit(false)
    setOpenDialog(true)
  }

  const onEditTechMap = () => {
    setIsEdit(true)
    setOpenDialog(true)
  }

  const onSave = async (form: TechMapFormValues) => {
    const data: ICreateOrUpdateTechMap = {
      supplierId,
      name: form.name,
      techMapJobs: form.jobs.map(it => ({ ...it, jobDependence: it.jobDependence.map(it => it.id) }))
    }

    if (isEdit && currentTechMap) {
      data.techMapId = currentTechMap?.id || ''
      await dispatch(updateTechMap(data))
    } else {
      await dispatch(createTechMap(data))
    }

    setOpenDialog(false)
  }

  const removeTechMap = async () => {
    if (currentTechMap) {
      await dispatch(deleteTechMap({ techMapId: currentTechMap.id }))
    }
  }

  const getTechMaps = async () => {
    await dispatch(getSupplierTechMaps({ supplierId }));
  }

  useEffect(() => {
    if (supplierTechMaps === null) {
      getTechMaps()
    }  

    if(supplierTechMaps && supplierTechMaps?.length > 0) {
      setCurrentTechMap({ label: supplierTechMaps[0].name, id: supplierTechMaps[0].id || '' })
    }
  }, [supplierTechMaps])

  return (
    <Box className={style.container}>
      <Box className={style.techMapTitle}>Технологические карты</Box>

      {getLoader && <Box sx={flexCenter}><JetSpinner size={85} /></Box>}

      {!hasData &&
        <Box className={style.noData}>
          Нет найдено данных для аналитики
        </Box>
      }

      {hasData &&
          <>
            {techMapsOptions?.length &&
              <Box className={style.techMapOptions}>
                <JetTechMapCombobox options={techMapsOptions} onChange={setCurrentTechMap} />
              </Box>
            }
            {techMapTableRows.length !== 0 &&
              <Box className={style.techMap}>
                <JetTechMapTable rows={techMapTableRows} columns={techMapColumns} />
              </Box>}
            {hasCriticalPath && <Box className={style.techMapGraphWrapper}>
              <Box className={style.techMapGraphTitle}>Критический путь</Box>
              <Box className={style.techMapGraph}>
                {currentTechMapData.criticalPath.techMapJobs.map((job, index) => {
                  return (
                    <Box key={index} className={style.job}>
                      <Box className={style.jobNumber}>{index + 1}</Box>
                      <Box>{job.jobName}</Box>
                      <Box>{job.jobDuration} ч</Box>
                    </Box>
                  );
                })}
              </Box>
              <Box className={style.criticalPathTime}>Общее время выполнения: <span>{currentTechMapData.criticalPath.totalDuration} часов</span></Box>
            </Box>}
          </>
      }
      <Box className={style.fabs}>
        <Fab color="primary" onClick={onEditTechMap}>
          <EditIcon />
        </Fab>
        <Fab color="primary" onClick={onAddTechMap}>
          <AddIcon />
        </Fab>
        <Fab color="primary" onClick={removeTechMap}>
          <JetIcon icon='jet-trash' />
        </Fab>
      </Box>
      <JetDialog open={openDialog} onClose={() => setOpenDialog(false)} fullwidth={true}>
        <JetTechMapForm onSaveForm={onSave} defaultValue={currentTechMapFormData} isEdit={isEdit} />
      </JetDialog>
    </Box>
  )
}

export default JetSupplierTechMap