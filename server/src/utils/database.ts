export const getDatabaseErrorMessage = (error: unknown, fallback: string) => {
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "42P01"
  ) {
    return "The sit-in database tables are missing. Run the latest server migrations, then reload the page.";
  }

  return error instanceof Error ? error.message : fallback;
};
