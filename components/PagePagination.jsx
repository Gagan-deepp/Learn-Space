import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"

const PagePagination = ({ currentPage }) => {
    return (
        <Pagination className="mt-4" >
            <PaginationContent >
                <PaginationItem>
                    <PaginationPrevious href={`?page=${currentPage > 1 ? currentPage - 1 : 1}`} className={`pagination-text ${currentPage <= 1 && 'pointer-events-none'}`} />
                </PaginationItem>


                {[1, 2, 3, 4].map((val, index) => (
                    <PaginationItem key={index} className="pagination-li" >
                        <PaginationLink href={`?page=${val}`} isActive={currentPage === val} className={`pagination-text ${currentPage === val && 'pagination-isActive'} `} >
                            {val}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>

                <PaginationItem>
                    <PaginationNext href={`?page=${currentPage + 1}`} className="pagination-text" />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

export default PagePagination