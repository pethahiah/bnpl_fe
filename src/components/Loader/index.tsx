const Loader = () => {
    return (
        <div className="flex flex-row flex-wrap w-full h-full overflow-auto gap-1 justify-center items-center">
            <button type="button" disabled>
                <svg className="mr-3 size-5 animate-spin " viewBox="0 0 24 24">
                </svg>
                Loading…
            </button>
        </div>
    )
};

export default Loader;
