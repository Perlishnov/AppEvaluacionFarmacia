namespace EvaluacionFarmaciaAPI
{
    public class InspectionGetDTO
    {
        public int InspectionId { get; set; }
        public DateTime ScheduledDate { get; set; }
        public DateTime ModifiedDate { get; set; }
        public int DrugStoreId { get; set; }
        public string? DrugStoreName { get; set; }
        public int StatusInspId {get; set; }
        public string? Status { get; set; }
    }
}