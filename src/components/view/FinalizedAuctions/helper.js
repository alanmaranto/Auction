const getTableSettings = () => {
  const header = [
    {
      name: "title",
      title: "Titulo",
      sorted: false,
    },
    {
      name: "endingAuction",
      sorted: true,
      title: "Fecha de finalización",
    },
    {
      name: "winner",
      sorted: true,
      title: "Ganador",
      buttonActions: true,
    },
  ];
  return header;
};

const formatWithPagination = (dataSource, elementsByPage) => {
  const allPages = {};
  let currentRow = 0;
  let page = 1;
  if (dataSource) {
    dataSource.forEach((data) => {
      if (currentRow < elementsByPage) {
        currentRow++;
      } else {
        currentRow = 0;
        page++;
      }
      if (!allPages[page]) {
        allPages[page] = [];
      }
      allPages[page].push(data);
    });
  } 
  return { dataSource: allPages };
};

const filterData = (props) => {
  const {
    dataSource,
    currentPage,
    elementsByPage,
    filter: searchParam,
  } = props;

  const paramFilter = searchParam ? searchParam.toLowerCase() : undefined;

  if (dataSource) {
    let dataSourceList = [];
    if (paramFilter !== undefined || (paramFilter && paramFilter.length)) {
      dataSource.forEach((element) => {
        if (element.title.toLowerCase().includes(paramFilter)) {
          dataSourceList.push(element);
        }
      });
    } else {
      dataSourceList = dataSource;
    }

    const { dataSource: newDataSource } = formatWithPagination(
      dataSourceList,
      elementsByPage
    );

    const lastkey = Number(
      Object.keys(newDataSource)[Object.keys(newDataSource).length - 1 || 0]
    );
    let newCurrentPage = 1;
    if (currentPage <= lastkey) {
      newCurrentPage = currentPage;
    }
    return {
      dataSource: newDataSource[newCurrentPage],
      dataSourceSize: dataSourceList.length,
    };
  }
  return { dataSource: {}, dataSourceSize: 0 };
};

export { getTableSettings, filterData };
