"use client";

import React from "react";
import { Box, Pagination } from "@mui/material";

interface CustomPaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <Pagination
        sx={{
          "& .MuiPaginationItem-root": {
            color: "white", 
          },
          "& .Mui-selected": {
            backgroundColor: "blue", 
            color: "white", 
          },
        }}
        count={totalPages} 
        page={currentPage} 
        onChange={onPageChange} 
        color="primary"
      />
    </Box>
  );
};

export default CustomPagination;
