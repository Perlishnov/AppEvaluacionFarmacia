namespace EvaluacionFarmaciaAPI.DTOs
{
    public class InspectionDTO
    {
        public int InspectionId { get; set; }
        public DateTime ScheduledDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string Status { get; set; }
        public int DrugStoreId { get; set; }
        public string DrugStoreName { get; set; }
    }

    public class InspectorDashboardDTO
    {
        public int TotalAssignedInspections { get; set; }
        public int TotalCompletedInspections { get; set; }
    }
}
