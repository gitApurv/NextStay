import Link from "next/link";

const Pagination = ({ currPage, total }) => {
  return (
    <section className="container mx-auto flex justify-center items-center my-8">
      {currPage > 1 && (
        <Link
          className="mr-2 px-2 py-1 border border-gray-300 rounded"
          href={`/properties?page=${currPage - 1}`}
        >
          Previous
        </Link>
      )}

      <span className="mx-2">
        Page {currPage} of {total}
      </span>

      {currPage < total && (
        <Link
          className="ml-2 px-2 py-1 border border-gray-300 rounded"
          href={`/properties?page=${currPage + 1}`}
        >
          Next
        </Link>
      )}
    </section>
  );
};

export default Pagination;
